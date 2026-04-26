/**
 * Minimal SNBT (Stringified NBT) parser and serializer for prismarine-nbt format.
 * Handles the subset of SNBT produced by Minecraft for block entity data.
 */

export interface NbtByte   { type: 'byte';      value: number }
export interface NbtShort  { type: 'short';     value: number }
export interface NbtInt    { type: 'int';       value: number }
export interface NbtLong   { type: 'long';      value: [number, number] }
export interface NbtFloat  { type: 'float';     value: number }
export interface NbtDouble { type: 'double';    value: number }
export interface NbtString { type: 'string';    value: string }
export interface NbtByteArray { type: 'byteArray'; value: Int8Array }
export interface NbtIntArray  { type: 'intArray';  value: Int32Array }
export interface NbtLongArray { type: 'longArray'; value: Array<[number, number]> }
export interface NbtList<T extends NbtTag = NbtTag> { type: 'list'; value: { type: string; value: T[] } }
export interface NbtCompound  { type: 'compound'; value: Record<string, NbtTag> }

export type NbtTag =
  | NbtByte | NbtShort | NbtInt | NbtLong
  | NbtFloat | NbtDouble | NbtString
  | NbtByteArray | NbtIntArray | NbtLongArray
  | NbtList | NbtCompound;

// ---------------------------------------------------------------------------
// Parser
// ---------------------------------------------------------------------------

class SnbtParser {
  private pos = 0;
  constructor(private readonly src: string) {}

  parse(): NbtTag {
    this.skipWs();
    return this.parseValue();
  }

  private skipWs() {
    while (this.pos < this.src.length && /\s/.test(this.src[this.pos])) this.pos++;
  }

  private peek(): string { return this.src[this.pos]; }
  private consume(): string { return this.src[this.pos++]; }

  private expect(ch: string): void {
    this.skipWs();
    if (this.src[this.pos] !== ch) {
      throw new Error(`Expected '${ch}' at pos ${this.pos}, got '${this.src[this.pos]}'`);
    }
    this.pos++;
  }

  private parseValue(): NbtTag {
    this.skipWs();
    const ch = this.peek();

    if (ch === '{') return this.parseCompound();
    if (ch === '[') return this.parseListOrArray();
    if (ch === '"' || ch === "'") return this.parseQuotedString();

    return this.parseUnquotedValue();
  }

  private parseCompound(): NbtCompound {
    this.expect('{');
    const value: Record<string, NbtTag> = {};

    this.skipWs();
    while (this.peek() !== '}') {
      this.skipWs();
      const key = this.parseKey();
      this.skipWs();
      this.expect(':');
      this.skipWs();
      const val = this.parseValue();
      value[key] = val;
      this.skipWs();
      if (this.peek() === ',') { this.pos++; this.skipWs(); }
    }
    this.expect('}');
    return { type: 'compound', value };
  }

  private parseKey(): string {
    this.skipWs();
    if (this.peek() === '"' || this.peek() === "'") {
      return (this.parseQuotedString() as NbtString).value;
    }
    let key = '';
    while (this.pos < this.src.length && /[^:,\{\}\[\]\s]/.test(this.src[this.pos])) {
      key += this.consume();
    }
    return key;
  }

  private parseListOrArray(): NbtTag {
    this.expect('[');
    this.skipWs();

    // Check for typed array prefix: B;, I;, L;
    if (this.pos + 1 < this.src.length && this.src[this.pos + 1] === ';') {
      const prefix = this.src[this.pos];
      if (prefix === 'B' || prefix === 'I' || prefix === 'L') {
        this.pos += 2;
        this.skipWs();
        const items: number[] = [];
        while (this.peek() !== ']') {
          this.skipWs();
          const raw = this.readUnquotedToken();
          items.push(parseFloat(raw.replace(/[bBsSlL]$/, '')));
          this.skipWs();
          if (this.peek() === ',') { this.pos++; this.skipWs(); }
        }
        this.expect(']');
        if (prefix === 'B') return { type: 'byteArray', value: new Int8Array(items) };
        if (prefix === 'I') return { type: 'intArray', value: new Int32Array(items) };
        // L
        return {
          type: 'longArray',
          value: items.map((n) => longFromNumber(n)),
        };
      }
    }

    // Regular list
    const elements: NbtTag[] = [];
    this.skipWs();
    while (this.peek() !== ']') {
      elements.push(this.parseValue());
      this.skipWs();
      if (this.peek() === ',') { this.pos++; this.skipWs(); }
    }
    this.expect(']');

    if (elements.length === 0) {
      return { type: 'list', value: { type: 'end', value: [] } };
    }
    return { type: 'list', value: { type: elements[0].type, value: elements } };
  }

  private parseQuotedString(): NbtString {
    const quote = this.consume();
    let str = '';
    while (this.pos < this.src.length && this.src[this.pos] !== quote) {
      if (this.src[this.pos] === '\\') { this.pos++; }
      str += this.consume();
    }
    this.pos++; // closing quote
    return { type: 'string', value: str };
  }

  private parseUnquotedValue(): NbtTag {
    const token = this.readUnquotedToken();
    return parseNumericToken(token);
  }

  private readUnquotedToken(): string {
    let token = '';
    while (this.pos < this.src.length && /[^\s,\{\}\[\]]/.test(this.src[this.pos])) {
      token += this.consume();
    }
    return token;
  }
}

function parseNumericToken(token: string): NbtTag {
  const lower = token.toLowerCase();

  if (lower === 'true') return { type: 'byte', value: 1 };
  if (lower === 'false') return { type: 'byte', value: 0 };

  if (/^-?\d+b$/i.test(token)) return { type: 'byte', value: parseInt(token) };
  if (/^-?\d+s$/i.test(token)) return { type: 'short', value: parseInt(token) };
  if (/^-?\d+l$/i.test(token)) return { type: 'long', value: longFromNumber(parseInt(token)) };
  if (/^-?\d+(\.\d+)?f$/i.test(token)) return { type: 'float', value: parseFloat(token) };
  if (/^-?\d+(\.\d+)?d$/i.test(token)) return { type: 'double', value: parseFloat(token) };
  if (/^-?\d+\.\d*$/.test(token)) return { type: 'double', value: parseFloat(token) };
  if (/^-?\d+$/.test(token)) return { type: 'int', value: parseInt(token) };

  // fallback: treat as string
  return { type: 'string', value: token };
}

function longFromNumber(n: number): [number, number] {
  const high = Math.floor(n / 0x100000000);
  const low = n >>> 0;
  return [high, low];
}

export function parseSnbt(snbt: string): NbtTag {
  return new SnbtParser(snbt).parse();
}

// ---------------------------------------------------------------------------
// Serializer (NbtTag → SNBT string)
// ---------------------------------------------------------------------------

export function serializeTag(tag: NbtTag): string {
  switch (tag.type) {
    case 'byte':   return `${tag.value}b`;
    case 'short':  return `${tag.value}s`;
    case 'int':    return `${tag.value}`;
    case 'long':   return `${longToNumber(tag.value)}L`;
    case 'float':  return `${tag.value}f`;
    case 'double': return `${tag.value}d`;
    case 'string': return serializeString(tag.value);
    case 'byteArray': return `[B;${Array.from(tag.value).map((v) => `${v}b`).join(',')}]`;
    case 'intArray':  return `[I;${Array.from(tag.value).join(',')}]`;
    case 'longArray': return `[L;${tag.value.map((v) => `${longToNumber(v)}L`).join(',')}]`;
    case 'list': {
      if (!tag.value.value || tag.value.value.length === 0) return '[]';
      return '[' + tag.value.value.map((t) => serializeTag(t)).join(',') + ']';
    }
    case 'compound': {
      const entries = Object.entries(tag.value)
        .map(([k, v]) => `${needsQuotes(k) ? serializeString(k) : k}:${serializeTag(v)}`);
      return '{' + entries.join(',') + '}';
    }
    default: return '';
  }
}

function longToNumber(v: [number, number]): number {
  return v[0] * 0x100000000 + (v[1] >>> 0);
}

function needsQuotes(key: string): boolean {
  return /[^a-zA-Z0-9_+\-.]/.test(key);
}

function serializeString(s: string): string {
  if (s.includes('"') && !s.includes("'")) return "'" + s + "'";
  return '"' + s.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
}
