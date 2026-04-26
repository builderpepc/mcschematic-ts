export class BlockDataDB {
  static readonly BARREL = class {
    static readonly _barrelSS: string[] = [
      `minecraft:barrel[open=false,facing=up]{CustomName:'{"italic":false,"text":"0"}'}`,
      `minecraft:barrel[open=false,facing=up]{CustomName:'{"italic":false,"text":"1"}',Items:[{Count:1b,Slot:0b,id:"minecraft:redstone"}]}`,
      `minecraft:barrel[open=false,facing=up]{CustomName:'{"italic":false,"text":"2"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:60b,Slot:1b,id:"minecraft:redstone"}]}`,
      `minecraft:barrel[open=false,facing=up]{CustomName:'{"italic":false,"text":"3"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:55b,Slot:3b,id:"minecraft:redstone"}]}`,
      `minecraft:barrel[open=false,facing=up]{CustomName:'{"italic":false,"text":"4"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:64b,Slot:3b,id:"minecraft:redstone"},{Count:64b,Slot:4b,id:"minecraft:redstone"},{Count:51b,Slot:5b,id:"minecraft:redstone"}]}`,
      `minecraft:barrel[open=false,facing=up]{CustomName:'{"italic":false,"text":"5"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:64b,Slot:3b,id:"minecraft:redstone"},{Count:64b,Slot:4b,id:"minecraft:redstone"},{Count:64b,Slot:5b,id:"minecraft:redstone"},{Count:64b,Slot:6b,id:"minecraft:redstone"},{Count:46b,Slot:7b,id:"minecraft:redstone"}]}`,
      `minecraft:barrel[open=false,facing=up]{CustomName:'{"italic":false,"text":"6"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:64b,Slot:3b,id:"minecraft:redstone"},{Count:64b,Slot:4b,id:"minecraft:redstone"},{Count:64b,Slot:5b,id:"minecraft:redstone"},{Count:64b,Slot:6b,id:"minecraft:redstone"},{Count:64b,Slot:7b,id:"minecraft:redstone"},{Count:64b,Slot:8b,id:"minecraft:redstone"},{Count:42b,Slot:9b,id:"minecraft:redstone"}]}`,
      `minecraft:barrel[open=false,facing=up]{CustomName:'{"italic":false,"text":"7"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:64b,Slot:3b,id:"minecraft:redstone"},{Count:64b,Slot:4b,id:"minecraft:redstone"},{Count:64b,Slot:5b,id:"minecraft:redstone"},{Count:64b,Slot:6b,id:"minecraft:redstone"},{Count:64b,Slot:7b,id:"minecraft:redstone"},{Count:64b,Slot:8b,id:"minecraft:redstone"},{Count:64b,Slot:9b,id:"minecraft:redstone"},{Count:64b,Slot:10b,id:"minecraft:redstone"},{Count:37b,Slot:11b,id:"minecraft:redstone"}]}`,
      `minecraft:barrel[open=false,facing=up]{CustomName:'{"italic":false,"text":"8"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:64b,Slot:3b,id:"minecraft:redstone"},{Count:64b,Slot:4b,id:"minecraft:redstone"},{Count:64b,Slot:5b,id:"minecraft:redstone"},{Count:64b,Slot:6b,id:"minecraft:redstone"},{Count:64b,Slot:7b,id:"minecraft:redstone"},{Count:64b,Slot:8b,id:"minecraft:redstone"},{Count:64b,Slot:9b,id:"minecraft:redstone"},{Count:64b,Slot:10b,id:"minecraft:redstone"},{Count:64b,Slot:11b,id:"minecraft:redstone"},{Count:64b,Slot:12b,id:"minecraft:redstone"},{Count:32b,Slot:13b,id:"minecraft:redstone"}]}`,
      `minecraft:barrel[open=false,facing=up]{CustomName:'{"italic":false,"text":"9"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:64b,Slot:3b,id:"minecraft:redstone"},{Count:64b,Slot:4b,id:"minecraft:redstone"},{Count:64b,Slot:5b,id:"minecraft:redstone"},{Count:64b,Slot:6b,id:"minecraft:redstone"},{Count:64b,Slot:7b,id:"minecraft:redstone"},{Count:64b,Slot:8b,id:"minecraft:redstone"},{Count:64b,Slot:9b,id:"minecraft:redstone"},{Count:64b,Slot:10b,id:"minecraft:redstone"},{Count:64b,Slot:11b,id:"minecraft:redstone"},{Count:64b,Slot:12b,id:"minecraft:redstone"},{Count:64b,Slot:13b,id:"minecraft:redstone"},{Count:64b,Slot:14b,id:"minecraft:redstone"},{Count:28b,Slot:15b,id:"minecraft:redstone"}]}`,
      `minecraft:barrel[open=false,facing=up]{CustomName:'{"italic":false,"text":"10"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:64b,Slot:3b,id:"minecraft:redstone"},{Count:64b,Slot:4b,id:"minecraft:redstone"},{Count:64b,Slot:5b,id:"minecraft:redstone"},{Count:64b,Slot:6b,id:"minecraft:redstone"},{Count:64b,Slot:7b,id:"minecraft:redstone"},{Count:64b,Slot:8b,id:"minecraft:redstone"},{Count:64b,Slot:9b,id:"minecraft:redstone"},{Count:64b,Slot:10b,id:"minecraft:redstone"},{Count:64b,Slot:11b,id:"minecraft:redstone"},{Count:64b,Slot:12b,id:"minecraft:redstone"},{Count:64b,Slot:13b,id:"minecraft:redstone"},{Count:64b,Slot:14b,id:"minecraft:redstone"},{Count:64b,Slot:15b,id:"minecraft:redstone"},{Count:64b,Slot:16b,id:"minecraft:redstone"},{Count:23b,Slot:17b,id:"minecraft:redstone"}]}`,
      `minecraft:barrel[open=false,facing=up]{CustomName:'{"italic":false,"text":"11"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:64b,Slot:3b,id:"minecraft:redstone"},{Count:64b,Slot:4b,id:"minecraft:redstone"},{Count:64b,Slot:5b,id:"minecraft:redstone"},{Count:64b,Slot:6b,id:"minecraft:redstone"},{Count:64b,Slot:7b,id:"minecraft:redstone"},{Count:64b,Slot:8b,id:"minecraft:redstone"},{Count:64b,Slot:9b,id:"minecraft:redstone"},{Count:64b,Slot:10b,id:"minecraft:redstone"},{Count:64b,Slot:11b,id:"minecraft:redstone"},{Count:64b,Slot:12b,id:"minecraft:redstone"},{Count:64b,Slot:13b,id:"minecraft:redstone"},{Count:64b,Slot:14b,id:"minecraft:redstone"},{Count:64b,Slot:15b,id:"minecraft:redstone"},{Count:64b,Slot:16b,id:"minecraft:redstone"},{Count:64b,Slot:17b,id:"minecraft:redstone"},{Count:64b,Slot:18b,id:"minecraft:redstone"},{Count:19b,Slot:19b,id:"minecraft:redstone"}]}`,
      `minecraft:barrel[open=false,facing=up]{CustomName:'{"italic":false,"text":"12"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:64b,Slot:3b,id:"minecraft:redstone"},{Count:64b,Slot:4b,id:"minecraft:redstone"},{Count:64b,Slot:5b,id:"minecraft:redstone"},{Count:64b,Slot:6b,id:"minecraft:redstone"},{Count:64b,Slot:7b,id:"minecraft:redstone"},{Count:64b,Slot:8b,id:"minecraft:redstone"},{Count:64b,Slot:9b,id:"minecraft:redstone"},{Count:64b,Slot:10b,id:"minecraft:redstone"},{Count:64b,Slot:11b,id:"minecraft:redstone"},{Count:64b,Slot:12b,id:"minecraft:redstone"},{Count:64b,Slot:13b,id:"minecraft:redstone"},{Count:64b,Slot:14b,id:"minecraft:redstone"},{Count:64b,Slot:15b,id:"minecraft:redstone"},{Count:64b,Slot:16b,id:"minecraft:redstone"},{Count:64b,Slot:17b,id:"minecraft:redstone"},{Count:64b,Slot:18b,id:"minecraft:redstone"},{Count:64b,Slot:19b,id:"minecraft:redstone"},{Count:64b,Slot:20b,id:"minecraft:redstone"},{Count:14b,Slot:21b,id:"minecraft:redstone"}]}`,
      `minecraft:barrel[open=false,facing=up]{CustomName:'{"italic":false,"text":"13"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:64b,Slot:3b,id:"minecraft:redstone"},{Count:64b,Slot:4b,id:"minecraft:redstone"},{Count:64b,Slot:5b,id:"minecraft:redstone"},{Count:64b,Slot:6b,id:"minecraft:redstone"},{Count:64b,Slot:7b,id:"minecraft:redstone"},{Count:64b,Slot:8b,id:"minecraft:redstone"},{Count:64b,Slot:9b,id:"minecraft:redstone"},{Count:64b,Slot:10b,id:"minecraft:redstone"},{Count:64b,Slot:11b,id:"minecraft:redstone"},{Count:64b,Slot:12b,id:"minecraft:redstone"},{Count:64b,Slot:13b,id:"minecraft:redstone"},{Count:64b,Slot:14b,id:"minecraft:redstone"},{Count:64b,Slot:15b,id:"minecraft:redstone"},{Count:64b,Slot:16b,id:"minecraft:redstone"},{Count:64b,Slot:17b,id:"minecraft:redstone"},{Count:64b,Slot:18b,id:"minecraft:redstone"},{Count:64b,Slot:19b,id:"minecraft:redstone"},{Count:64b,Slot:20b,id:"minecraft:redstone"},{Count:64b,Slot:21b,id:"minecraft:redstone"},{Count:64b,Slot:22b,id:"minecraft:redstone"},{Count:10b,Slot:23b,id:"minecraft:redstone"}]}`,
      `minecraft:barrel[open=false,facing=up]{CustomName:'{"italic":false,"text":"14"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:64b,Slot:3b,id:"minecraft:redstone"},{Count:64b,Slot:4b,id:"minecraft:redstone"},{Count:64b,Slot:5b,id:"minecraft:redstone"},{Count:64b,Slot:6b,id:"minecraft:redstone"},{Count:64b,Slot:7b,id:"minecraft:redstone"},{Count:64b,Slot:8b,id:"minecraft:redstone"},{Count:64b,Slot:9b,id:"minecraft:redstone"},{Count:64b,Slot:10b,id:"minecraft:redstone"},{Count:64b,Slot:11b,id:"minecraft:redstone"},{Count:64b,Slot:12b,id:"minecraft:redstone"},{Count:64b,Slot:13b,id:"minecraft:redstone"},{Count:64b,Slot:14b,id:"minecraft:redstone"},{Count:64b,Slot:15b,id:"minecraft:redstone"},{Count:64b,Slot:16b,id:"minecraft:redstone"},{Count:64b,Slot:17b,id:"minecraft:redstone"},{Count:64b,Slot:18b,id:"minecraft:redstone"},{Count:64b,Slot:19b,id:"minecraft:redstone"},{Count:64b,Slot:20b,id:"minecraft:redstone"},{Count:64b,Slot:21b,id:"minecraft:redstone"},{Count:64b,Slot:22b,id:"minecraft:redstone"},{Count:64b,Slot:23b,id:"minecraft:redstone"},{Count:64b,Slot:24b,id:"minecraft:redstone"},{Count:5b,Slot:25b,id:"minecraft:redstone"}]}`,
      `minecraft:barrel[open=false,facing=up]{CustomName:'{"italic":false,"text":"15"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:64b,Slot:3b,id:"minecraft:redstone"},{Count:64b,Slot:4b,id:"minecraft:redstone"},{Count:64b,Slot:5b,id:"minecraft:redstone"},{Count:64b,Slot:6b,id:"minecraft:redstone"},{Count:64b,Slot:7b,id:"minecraft:redstone"},{Count:64b,Slot:8b,id:"minecraft:redstone"},{Count:64b,Slot:9b,id:"minecraft:redstone"},{Count:64b,Slot:10b,id:"minecraft:redstone"},{Count:64b,Slot:11b,id:"minecraft:redstone"},{Count:64b,Slot:12b,id:"minecraft:redstone"},{Count:64b,Slot:13b,id:"minecraft:redstone"},{Count:64b,Slot:14b,id:"minecraft:redstone"},{Count:64b,Slot:15b,id:"minecraft:redstone"},{Count:64b,Slot:16b,id:"minecraft:redstone"},{Count:64b,Slot:17b,id:"minecraft:redstone"},{Count:64b,Slot:18b,id:"minecraft:redstone"},{Count:64b,Slot:19b,id:"minecraft:redstone"},{Count:64b,Slot:20b,id:"minecraft:redstone"},{Count:64b,Slot:21b,id:"minecraft:redstone"},{Count:64b,Slot:22b,id:"minecraft:redstone"},{Count:64b,Slot:23b,id:"minecraft:redstone"},{Count:64b,Slot:24b,id:"minecraft:redstone"},{Count:64b,Slot:25b,id:"minecraft:redstone"},{Count:64b,Slot:26b,id:"minecraft:redstone"},{Count:0b,Slot:27b,id:"minecraft:redstone"}]}`,
    ];

    static fromSS(ss: number): string {
      return BlockDataDB.BARREL._barrelSS[ss];
    }
  };

  static readonly HOPPER = class {
    static readonly _hopperSS: string[] = [
      `minecraft:hopper{CustomName:'{"italic":false,"text":"0"}'}`,
      `minecraft:hopper{CustomName:'{"italic":false,"text":"1"}',Items:[{Count:1b,Slot:0b,id:"minecraft:redstone"}]}`,
      `minecraft:hopper{CustomName:'{"italic":false,"text":"2"}',Items:[{Count:23b,Slot:0b,id:"minecraft:redstone"}]}`,
      `minecraft:hopper{CustomName:'{"italic":false,"text":"3"}',Items:[{Count:46b,Slot:0b,id:"minecraft:redstone"}]}`,
      `minecraft:hopper{CustomName:'{"italic":false,"text":"4"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:5b,Slot:1b,id:"minecraft:redstone"}]}`,
      `minecraft:hopper{CustomName:'{"italic":false,"text":"5"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:28b,Slot:1b,id:"minecraft:redstone"}]}`,
      `minecraft:hopper{CustomName:'{"italic":false,"text":"6"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:51b,Slot:1b,id:"minecraft:redstone"}]}`,
      `minecraft:hopper{CustomName:'{"italic":false,"text":"7"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:10b,Slot:2b,id:"minecraft:redstone"}]}`,
      `minecraft:hopper{CustomName:'{"italic":false,"text":"8"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:32b,Slot:2b,id:"minecraft:redstone"}]}`,
      `minecraft:hopper{CustomName:'{"italic":false,"text":"9"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:55b,Slot:2b,id:"minecraft:redstone"}]}`,
      `minecraft:hopper{CustomName:'{"italic":false,"text":"10"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:14b,Slot:3b,id:"minecraft:redstone"}]}`,
      `minecraft:hopper{CustomName:'{"italic":false,"text":"11"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:37b,Slot:3b,id:"minecraft:redstone"}]}`,
      `minecraft:hopper{CustomName:'{"italic":false,"text":"12"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:60b,Slot:3b,id:"minecraft:redstone"}]}`,
      `minecraft:hopper{CustomName:'{"italic":false,"text":"13"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:64b,Slot:3b,id:"minecraft:redstone"},{Count:19b,Slot:4b,id:"minecraft:redstone"}]}`,
      `minecraft:hopper{CustomName:'{"italic":false,"text":"14"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:64b,Slot:3b,id:"minecraft:redstone"},{Count:42b,Slot:4b,id:"minecraft:redstone"}]}`,
      `minecraft:hopper{CustomName:'{"italic":false,"text":"15"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:64b,Slot:3b,id:"minecraft:redstone"},{Count:64b,Slot:4b,id:"minecraft:redstone"},{Count:0b,Slot:5b,id:"minecraft:redstone"}]}`,
    ];

    static fromSS(ss: number): string {
      return BlockDataDB.HOPPER._hopperSS[ss];
    }
  };

  static readonly FURNACE = class {
    static readonly _furnaceSS: string[] = [
      `minecraft:furnace{CustomName:'{"italic":false,"text":"0"}'}`,
      `minecraft:furnace{CustomName:'{"italic":false,"text":"1"}',Items:[{Count:1b,Slot:0b,id:"minecraft:redstone"}]}`,
      `minecraft:furnace{CustomName:'{"italic":false,"text":"2"}',Items:[{Count:14b,Slot:0b,id:"minecraft:redstone"}]}`,
      `minecraft:furnace{CustomName:'{"italic":false,"text":"3"}',Items:[{Count:28b,Slot:0b,id:"minecraft:redstone"}]}`,
      `minecraft:furnace{CustomName:'{"italic":false,"text":"4"}',Items:[{Count:42b,Slot:0b,id:"minecraft:redstone"}]}`,
      `minecraft:furnace{CustomName:'{"italic":false,"text":"5"}',Items:[{Count:55b,Slot:0b,id:"minecraft:redstone"}]}`,
      `minecraft:furnace{CustomName:'{"italic":false,"text":"6"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:5b,Slot:1b,id:"minecraft:redstone"}]}`,
      `minecraft:furnace{CustomName:'{"italic":false,"text":"7"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:19b,Slot:1b,id:"minecraft:redstone"}]}`,
      `minecraft:furnace{CustomName:'{"italic":false,"text":"8"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:32b,Slot:1b,id:"minecraft:redstone"}]}`,
      `minecraft:furnace{CustomName:'{"italic":false,"text":"9"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:46b,Slot:1b,id:"minecraft:redstone"}]}`,
      `minecraft:furnace{CustomName:'{"italic":false,"text":"10"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:60b,Slot:1b,id:"minecraft:redstone"}]}`,
      `minecraft:furnace{CustomName:'{"italic":false,"text":"11"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:10b,Slot:2b,id:"minecraft:redstone"}]}`,
      `minecraft:furnace{CustomName:'{"italic":false,"text":"12"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:23b,Slot:2b,id:"minecraft:redstone"}]}`,
      `minecraft:furnace{CustomName:'{"italic":false,"text":"13"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:37b,Slot:2b,id:"minecraft:redstone"}]}`,
      `minecraft:furnace{CustomName:'{"italic":false,"text":"14"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:51b,Slot:2b,id:"minecraft:redstone"}]}`,
      `minecraft:furnace{CustomName:'{"italic":false,"text":"15"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:0b,Slot:3b,id:"minecraft:redstone"}]}`,
    ];

    static fromSS(ss: number): string {
      return BlockDataDB.FURNACE._furnaceSS[ss];
    }
  };

  // Static shortcut fields
  static readonly SS_BARREL0  = BlockDataDB.BARREL._barrelSS[0];
  static readonly SS_BARREL1  = BlockDataDB.BARREL._barrelSS[1];
  static readonly SS_BARREL2  = BlockDataDB.BARREL._barrelSS[2];
  static readonly SS_BARREL3  = BlockDataDB.BARREL._barrelSS[3];
  static readonly SS_BARREL4  = BlockDataDB.BARREL._barrelSS[4];
  static readonly SS_BARREL5  = BlockDataDB.BARREL._barrelSS[5];
  static readonly SS_BARREL6  = BlockDataDB.BARREL._barrelSS[6];
  static readonly SS_BARREL7  = BlockDataDB.BARREL._barrelSS[7];
  static readonly SS_BARREL8  = BlockDataDB.BARREL._barrelSS[8];
  static readonly SS_BARREL9  = BlockDataDB.BARREL._barrelSS[9];
  static readonly SS_BARREL10 = BlockDataDB.BARREL._barrelSS[10];
  static readonly SS_BARREL11 = BlockDataDB.BARREL._barrelSS[11];
  static readonly SS_BARREL12 = BlockDataDB.BARREL._barrelSS[12];
  static readonly SS_BARREL13 = BlockDataDB.BARREL._barrelSS[13];
  static readonly SS_BARREL14 = BlockDataDB.BARREL._barrelSS[14];
  static readonly SS_BARREL15 = BlockDataDB.BARREL._barrelSS[15];

  static readonly SS_HOPPER0  = BlockDataDB.HOPPER._hopperSS[0];
  static readonly SS_HOPPER1  = BlockDataDB.HOPPER._hopperSS[1];
  static readonly SS_HOPPER2  = BlockDataDB.HOPPER._hopperSS[2];
  static readonly SS_HOPPER3  = BlockDataDB.HOPPER._hopperSS[3];
  static readonly SS_HOPPER4  = BlockDataDB.HOPPER._hopperSS[4];
  static readonly SS_HOPPER5  = BlockDataDB.HOPPER._hopperSS[5];
  static readonly SS_HOPPER6  = BlockDataDB.HOPPER._hopperSS[6];
  static readonly SS_HOPPER7  = BlockDataDB.HOPPER._hopperSS[7];
  static readonly SS_HOPPER8  = BlockDataDB.HOPPER._hopperSS[8];
  static readonly SS_HOPPER9  = BlockDataDB.HOPPER._hopperSS[9];
  static readonly SS_HOPPER10 = BlockDataDB.HOPPER._hopperSS[10];
  static readonly SS_HOPPER11 = BlockDataDB.HOPPER._hopperSS[11];
  static readonly SS_HOPPER12 = BlockDataDB.HOPPER._hopperSS[12];
  static readonly SS_HOPPER13 = BlockDataDB.HOPPER._hopperSS[13];
  static readonly SS_HOPPER14 = BlockDataDB.HOPPER._hopperSS[14];
  static readonly SS_HOPPER15 = BlockDataDB.HOPPER._hopperSS[15];

  static readonly SS_FURNACE0  = BlockDataDB.FURNACE._furnaceSS[0];
  static readonly SS_FURNACE1  = BlockDataDB.FURNACE._furnaceSS[1];
  static readonly SS_FURNACE2  = BlockDataDB.FURNACE._furnaceSS[2];
  static readonly SS_FURNACE3  = BlockDataDB.FURNACE._furnaceSS[3];
  static readonly SS_FURNACE4  = BlockDataDB.FURNACE._furnaceSS[4];
  static readonly SS_FURNACE5  = BlockDataDB.FURNACE._furnaceSS[5];
  static readonly SS_FURNACE6  = BlockDataDB.FURNACE._furnaceSS[6];
  static readonly SS_FURNACE7  = BlockDataDB.FURNACE._furnaceSS[7];
  static readonly SS_FURNACE8  = BlockDataDB.FURNACE._furnaceSS[8];
  static readonly SS_FURNACE9  = BlockDataDB.FURNACE._furnaceSS[9];
  static readonly SS_FURNACE10 = BlockDataDB.FURNACE._furnaceSS[10];
  static readonly SS_FURNACE11 = BlockDataDB.FURNACE._furnaceSS[11];
  static readonly SS_FURNACE12 = BlockDataDB.FURNACE._furnaceSS[12];
  static readonly SS_FURNACE13 = BlockDataDB.FURNACE._furnaceSS[13];
  static readonly SS_FURNACE14 = BlockDataDB.FURNACE._furnaceSS[14];
  static readonly SS_FURNACE15 = BlockDataDB.FURNACE._furnaceSS[15];

  static readonly DISPENSER = class {
    static readonly _dispenserSS: string[] = [
      `minecraft:dispenser{CustomName:'{"italic":false,"text":"0"}'}`,
      `minecraft:dispenser{CustomName:'{"italic":false,"text":"1"}',Items:[{Count:1b,Slot:0b,id:"minecraft:redstone"}]}`,
      `minecraft:dispenser{CustomName:'{"italic":false,"text":"2"}',Items:[{Count:42b,Slot:0b,id:"minecraft:redstone"}]}`,
      `minecraft:dispenser{CustomName:'{"italic":false,"text":"3"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:19b,Slot:1b,id:"minecraft:redstone"}]}`,
      `minecraft:dispenser{CustomName:'{"italic":false,"text":"4"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:60b,Slot:1b,id:"minecraft:redstone"}]}`,
      `minecraft:dispenser{CustomName:'{"italic":false,"text":"5"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:37b,Slot:2b,id:"minecraft:redstone"}]}`,
      `minecraft:dispenser{CustomName:'{"italic":false,"text":"6"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:14b,Slot:3b,id:"minecraft:redstone"}]}`,
      `minecraft:dispenser{CustomName:'{"italic":false,"text":"7"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:55b,Slot:3b,id:"minecraft:redstone"}]}`,
      `minecraft:dispenser{CustomName:'{"italic":false,"text":"8"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:64b,Slot:3b,id:"minecraft:redstone"},{Count:32b,Slot:4b,id:"minecraft:redstone"}]}`,
      `minecraft:dispenser{CustomName:'{"italic":false,"text":"9"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:64b,Slot:3b,id:"minecraft:redstone"},{Count:64b,Slot:4b,id:"minecraft:redstone"},{Count:10b,Slot:5b,id:"minecraft:redstone"}]}`,
      `minecraft:dispenser{CustomName:'{"italic":false,"text":"10"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:64b,Slot:3b,id:"minecraft:redstone"},{Count:64b,Slot:4b,id:"minecraft:redstone"},{Count:51b,Slot:5b,id:"minecraft:redstone"}]}`,
      `minecraft:dispenser{CustomName:'{"italic":false,"text":"11"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:64b,Slot:3b,id:"minecraft:redstone"},{Count:64b,Slot:4b,id:"minecraft:redstone"},{Count:64b,Slot:5b,id:"minecraft:redstone"},{Count:28b,Slot:6b,id:"minecraft:redstone"}]}`,
      `minecraft:dispenser{CustomName:'{"italic":false,"text":"12"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:64b,Slot:3b,id:"minecraft:redstone"},{Count:64b,Slot:4b,id:"minecraft:redstone"},{Count:64b,Slot:5b,id:"minecraft:redstone"},{Count:64b,Slot:6b,id:"minecraft:redstone"},{Count:5b,Slot:7b,id:"minecraft:redstone"}]}`,
      `minecraft:dispenser{CustomName:'{"italic":false,"text":"13"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:64b,Slot:3b,id:"minecraft:redstone"},{Count:64b,Slot:4b,id:"minecraft:redstone"},{Count:64b,Slot:5b,id:"minecraft:redstone"},{Count:64b,Slot:6b,id:"minecraft:redstone"},{Count:46b,Slot:7b,id:"minecraft:redstone"}]}`,
      `minecraft:dispenser{CustomName:'{"italic":false,"text":"14"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:64b,Slot:3b,id:"minecraft:redstone"},{Count:64b,Slot:4b,id:"minecraft:redstone"},{Count:64b,Slot:5b,id:"minecraft:redstone"},{Count:64b,Slot:6b,id:"minecraft:redstone"},{Count:64b,Slot:7b,id:"minecraft:redstone"},{Count:23b,Slot:8b,id:"minecraft:redstone"}]}`,
      `minecraft:dispenser{CustomName:'{"italic":false,"text":"15"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:64b,Slot:3b,id:"minecraft:redstone"},{Count:64b,Slot:4b,id:"minecraft:redstone"},{Count:64b,Slot:5b,id:"minecraft:redstone"},{Count:64b,Slot:6b,id:"minecraft:redstone"},{Count:64b,Slot:7b,id:"minecraft:redstone"},{Count:64b,Slot:8b,id:"minecraft:redstone"},{Count:0b,Slot:9b,id:"minecraft:redstone"}]}`,
    ];
    static fromSS(ss: number): string { return BlockDataDB.DISPENSER._dispenserSS[ss]; }
  };

  static readonly SS_DISPENSER0  = BlockDataDB.DISPENSER._dispenserSS[0];
  static readonly SS_DISPENSER1  = BlockDataDB.DISPENSER._dispenserSS[1];
  static readonly SS_DISPENSER2  = BlockDataDB.DISPENSER._dispenserSS[2];
  static readonly SS_DISPENSER3  = BlockDataDB.DISPENSER._dispenserSS[3];
  static readonly SS_DISPENSER4  = BlockDataDB.DISPENSER._dispenserSS[4];
  static readonly SS_DISPENSER5  = BlockDataDB.DISPENSER._dispenserSS[5];
  static readonly SS_DISPENSER6  = BlockDataDB.DISPENSER._dispenserSS[6];
  static readonly SS_DISPENSER7  = BlockDataDB.DISPENSER._dispenserSS[7];
  static readonly SS_DISPENSER8  = BlockDataDB.DISPENSER._dispenserSS[8];
  static readonly SS_DISPENSER9  = BlockDataDB.DISPENSER._dispenserSS[9];
  static readonly SS_DISPENSER10 = BlockDataDB.DISPENSER._dispenserSS[10];
  static readonly SS_DISPENSER11 = BlockDataDB.DISPENSER._dispenserSS[11];
  static readonly SS_DISPENSER12 = BlockDataDB.DISPENSER._dispenserSS[12];
  static readonly SS_DISPENSER13 = BlockDataDB.DISPENSER._dispenserSS[13];
  static readonly SS_DISPENSER14 = BlockDataDB.DISPENSER._dispenserSS[14];
  static readonly SS_DISPENSER15 = BlockDataDB.DISPENSER._dispenserSS[15];

  static readonly DROPPER = class {
    static readonly _dropperSS: string[] = [
      `minecraft:dropper{CustomName:'{"italic":false,"text":"0"}'}`,
      `minecraft:dropper{CustomName:'{"italic":false,"text":"1"}',Items:[{Count:1b,Slot:0b,id:"minecraft:redstone"}]}`,
      `minecraft:dropper{CustomName:'{"italic":false,"text":"2"}',Items:[{Count:42b,Slot:0b,id:"minecraft:redstone"}]}`,
      `minecraft:dropper{CustomName:'{"italic":false,"text":"3"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:19b,Slot:1b,id:"minecraft:redstone"}]}`,
      `minecraft:dropper{CustomName:'{"italic":false,"text":"4"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:60b,Slot:1b,id:"minecraft:redstone"}]}`,
      `minecraft:dropper{CustomName:'{"italic":false,"text":"5"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:37b,Slot:2b,id:"minecraft:redstone"}]}`,
      `minecraft:dropper{CustomName:'{"italic":false,"text":"6"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:14b,Slot:3b,id:"minecraft:redstone"}]}`,
      `minecraft:dropper{CustomName:'{"italic":false,"text":"7"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:55b,Slot:3b,id:"minecraft:redstone"}]}`,
      `minecraft:dropper{CustomName:'{"italic":false,"text":"8"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:64b,Slot:3b,id:"minecraft:redstone"},{Count:32b,Slot:4b,id:"minecraft:redstone"}]}`,
      `minecraft:dropper{CustomName:'{"italic":false,"text":"9"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:64b,Slot:3b,id:"minecraft:redstone"},{Count:64b,Slot:4b,id:"minecraft:redstone"},{Count:10b,Slot:5b,id:"minecraft:redstone"}]}`,
      `minecraft:dropper{CustomName:'{"italic":false,"text":"10"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:64b,Slot:3b,id:"minecraft:redstone"},{Count:64b,Slot:4b,id:"minecraft:redstone"},{Count:51b,Slot:5b,id:"minecraft:redstone"}]}`,
      `minecraft:dropper{CustomName:'{"italic":false,"text":"11"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:64b,Slot:3b,id:"minecraft:redstone"},{Count:64b,Slot:4b,id:"minecraft:redstone"},{Count:64b,Slot:5b,id:"minecraft:redstone"},{Count:28b,Slot:6b,id:"minecraft:redstone"}]}`,
      `minecraft:dropper{CustomName:'{"italic":false,"text":"12"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:64b,Slot:3b,id:"minecraft:redstone"},{Count:64b,Slot:4b,id:"minecraft:redstone"},{Count:64b,Slot:5b,id:"minecraft:redstone"},{Count:64b,Slot:6b,id:"minecraft:redstone"},{Count:5b,Slot:7b,id:"minecraft:redstone"}]}`,
      `minecraft:dropper{CustomName:'{"italic":false,"text":"13"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:64b,Slot:3b,id:"minecraft:redstone"},{Count:64b,Slot:4b,id:"minecraft:redstone"},{Count:64b,Slot:5b,id:"minecraft:redstone"},{Count:64b,Slot:6b,id:"minecraft:redstone"},{Count:46b,Slot:7b,id:"minecraft:redstone"}]}`,
      `minecraft:dropper{CustomName:'{"italic":false,"text":"14"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:64b,Slot:3b,id:"minecraft:redstone"},{Count:64b,Slot:4b,id:"minecraft:redstone"},{Count:64b,Slot:5b,id:"minecraft:redstone"},{Count:64b,Slot:6b,id:"minecraft:redstone"},{Count:64b,Slot:7b,id:"minecraft:redstone"},{Count:23b,Slot:8b,id:"minecraft:redstone"}]}`,
      `minecraft:dropper{CustomName:'{"italic":false,"text":"15"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:64b,Slot:3b,id:"minecraft:redstone"},{Count:64b,Slot:4b,id:"minecraft:redstone"},{Count:64b,Slot:5b,id:"minecraft:redstone"},{Count:64b,Slot:6b,id:"minecraft:redstone"},{Count:64b,Slot:7b,id:"minecraft:redstone"},{Count:64b,Slot:8b,id:"minecraft:redstone"},{Count:0b,Slot:9b,id:"minecraft:redstone"}]}`,
    ];
    static fromSS(ss: number): string { return BlockDataDB.DROPPER._dropperSS[ss]; }
  };

  static readonly SS_DROPPER0  = BlockDataDB.DROPPER._dropperSS[0];
  static readonly SS_DROPPER1  = BlockDataDB.DROPPER._dropperSS[1];
  static readonly SS_DROPPER2  = BlockDataDB.DROPPER._dropperSS[2];
  static readonly SS_DROPPER3  = BlockDataDB.DROPPER._dropperSS[3];
  static readonly SS_DROPPER4  = BlockDataDB.DROPPER._dropperSS[4];
  static readonly SS_DROPPER5  = BlockDataDB.DROPPER._dropperSS[5];
  static readonly SS_DROPPER6  = BlockDataDB.DROPPER._dropperSS[6];
  static readonly SS_DROPPER7  = BlockDataDB.DROPPER._dropperSS[7];
  static readonly SS_DROPPER8  = BlockDataDB.DROPPER._dropperSS[8];
  static readonly SS_DROPPER9  = BlockDataDB.DROPPER._dropperSS[9];
  static readonly SS_DROPPER10 = BlockDataDB.DROPPER._dropperSS[10];
  static readonly SS_DROPPER11 = BlockDataDB.DROPPER._dropperSS[11];
  static readonly SS_DROPPER12 = BlockDataDB.DROPPER._dropperSS[12];
  static readonly SS_DROPPER13 = BlockDataDB.DROPPER._dropperSS[13];
  static readonly SS_DROPPER14 = BlockDataDB.DROPPER._dropperSS[14];
  static readonly SS_DROPPER15 = BlockDataDB.DROPPER._dropperSS[15];

  static readonly TRAPPED_CHEST = class {
    static readonly _trapped_chestSS: string[] = [
      `minecraft:trapped_chest{CustomName:'{"italic":false,"text":"0"}'}`,
      `minecraft:trapped_chest{CustomName:'{"italic":false,"text":"1"}',Items:[{Count:1b,Slot:0b,id:"minecraft:redstone"}]}`,
      `minecraft:trapped_chest{CustomName:'{"italic":false,"text":"2"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:60b,Slot:1b,id:"minecraft:redstone"}]}`,
      `minecraft:trapped_chest{CustomName:'{"italic":false,"text":"3"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:55b,Slot:3b,id:"minecraft:redstone"}]}`,
      `minecraft:trapped_chest{CustomName:'{"italic":false,"text":"4"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:64b,Slot:3b,id:"minecraft:redstone"},{Count:64b,Slot:4b,id:"minecraft:redstone"},{Count:51b,Slot:5b,id:"minecraft:redstone"}]}`,
      `minecraft:trapped_chest{CustomName:'{"italic":false,"text":"5"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:64b,Slot:3b,id:"minecraft:redstone"},{Count:64b,Slot:4b,id:"minecraft:redstone"},{Count:64b,Slot:5b,id:"minecraft:redstone"},{Count:64b,Slot:6b,id:"minecraft:redstone"},{Count:46b,Slot:7b,id:"minecraft:redstone"}]}`,
      `minecraft:trapped_chest{CustomName:'{"italic":false,"text":"6"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:64b,Slot:3b,id:"minecraft:redstone"},{Count:64b,Slot:4b,id:"minecraft:redstone"},{Count:64b,Slot:5b,id:"minecraft:redstone"},{Count:64b,Slot:6b,id:"minecraft:redstone"},{Count:64b,Slot:7b,id:"minecraft:redstone"},{Count:64b,Slot:8b,id:"minecraft:redstone"},{Count:42b,Slot:9b,id:"minecraft:redstone"}]}`,
      `minecraft:trapped_chest{CustomName:'{"italic":false,"text":"7"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:64b,Slot:3b,id:"minecraft:redstone"},{Count:64b,Slot:4b,id:"minecraft:redstone"},{Count:64b,Slot:5b,id:"minecraft:redstone"},{Count:64b,Slot:6b,id:"minecraft:redstone"},{Count:64b,Slot:7b,id:"minecraft:redstone"},{Count:64b,Slot:8b,id:"minecraft:redstone"},{Count:64b,Slot:9b,id:"minecraft:redstone"},{Count:64b,Slot:10b,id:"minecraft:redstone"},{Count:37b,Slot:11b,id:"minecraft:redstone"}]}`,
      `minecraft:trapped_chest{CustomName:'{"italic":false,"text":"8"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:64b,Slot:3b,id:"minecraft:redstone"},{Count:64b,Slot:4b,id:"minecraft:redstone"},{Count:64b,Slot:5b,id:"minecraft:redstone"},{Count:64b,Slot:6b,id:"minecraft:redstone"},{Count:64b,Slot:7b,id:"minecraft:redstone"},{Count:64b,Slot:8b,id:"minecraft:redstone"},{Count:64b,Slot:9b,id:"minecraft:redstone"},{Count:64b,Slot:10b,id:"minecraft:redstone"},{Count:64b,Slot:11b,id:"minecraft:redstone"},{Count:64b,Slot:12b,id:"minecraft:redstone"},{Count:32b,Slot:13b,id:"minecraft:redstone"}]}`,
      `minecraft:trapped_chest{CustomName:'{"italic":false,"text":"9"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:64b,Slot:3b,id:"minecraft:redstone"},{Count:64b,Slot:4b,id:"minecraft:redstone"},{Count:64b,Slot:5b,id:"minecraft:redstone"},{Count:64b,Slot:6b,id:"minecraft:redstone"},{Count:64b,Slot:7b,id:"minecraft:redstone"},{Count:64b,Slot:8b,id:"minecraft:redstone"},{Count:64b,Slot:9b,id:"minecraft:redstone"},{Count:64b,Slot:10b,id:"minecraft:redstone"},{Count:64b,Slot:11b,id:"minecraft:redstone"},{Count:64b,Slot:12b,id:"minecraft:redstone"},{Count:64b,Slot:13b,id:"minecraft:redstone"},{Count:64b,Slot:14b,id:"minecraft:redstone"},{Count:28b,Slot:15b,id:"minecraft:redstone"}]}`,
      `minecraft:trapped_chest{CustomName:'{"italic":false,"text":"10"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:64b,Slot:3b,id:"minecraft:redstone"},{Count:64b,Slot:4b,id:"minecraft:redstone"},{Count:64b,Slot:5b,id:"minecraft:redstone"},{Count:64b,Slot:6b,id:"minecraft:redstone"},{Count:64b,Slot:7b,id:"minecraft:redstone"},{Count:64b,Slot:8b,id:"minecraft:redstone"},{Count:64b,Slot:9b,id:"minecraft:redstone"},{Count:64b,Slot:10b,id:"minecraft:redstone"},{Count:64b,Slot:11b,id:"minecraft:redstone"},{Count:64b,Slot:12b,id:"minecraft:redstone"},{Count:64b,Slot:13b,id:"minecraft:redstone"},{Count:64b,Slot:14b,id:"minecraft:redstone"},{Count:64b,Slot:15b,id:"minecraft:redstone"},{Count:64b,Slot:16b,id:"minecraft:redstone"},{Count:23b,Slot:17b,id:"minecraft:redstone"}]}`,
      `minecraft:trapped_chest{CustomName:'{"italic":false,"text":"11"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:64b,Slot:3b,id:"minecraft:redstone"},{Count:64b,Slot:4b,id:"minecraft:redstone"},{Count:64b,Slot:5b,id:"minecraft:redstone"},{Count:64b,Slot:6b,id:"minecraft:redstone"},{Count:64b,Slot:7b,id:"minecraft:redstone"},{Count:64b,Slot:8b,id:"minecraft:redstone"},{Count:64b,Slot:9b,id:"minecraft:redstone"},{Count:64b,Slot:10b,id:"minecraft:redstone"},{Count:64b,Slot:11b,id:"minecraft:redstone"},{Count:64b,Slot:12b,id:"minecraft:redstone"},{Count:64b,Slot:13b,id:"minecraft:redstone"},{Count:64b,Slot:14b,id:"minecraft:redstone"},{Count:64b,Slot:15b,id:"minecraft:redstone"},{Count:64b,Slot:16b,id:"minecraft:redstone"},{Count:64b,Slot:17b,id:"minecraft:redstone"},{Count:64b,Slot:18b,id:"minecraft:redstone"},{Count:19b,Slot:19b,id:"minecraft:redstone"}]}`,
      `minecraft:trapped_chest{CustomName:'{"italic":false,"text":"12"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:64b,Slot:3b,id:"minecraft:redstone"},{Count:64b,Slot:4b,id:"minecraft:redstone"},{Count:64b,Slot:5b,id:"minecraft:redstone"},{Count:64b,Slot:6b,id:"minecraft:redstone"},{Count:64b,Slot:7b,id:"minecraft:redstone"},{Count:64b,Slot:8b,id:"minecraft:redstone"},{Count:64b,Slot:9b,id:"minecraft:redstone"},{Count:64b,Slot:10b,id:"minecraft:redstone"},{Count:64b,Slot:11b,id:"minecraft:redstone"},{Count:64b,Slot:12b,id:"minecraft:redstone"},{Count:64b,Slot:13b,id:"minecraft:redstone"},{Count:64b,Slot:14b,id:"minecraft:redstone"},{Count:64b,Slot:15b,id:"minecraft:redstone"},{Count:64b,Slot:16b,id:"minecraft:redstone"},{Count:64b,Slot:17b,id:"minecraft:redstone"},{Count:64b,Slot:18b,id:"minecraft:redstone"},{Count:64b,Slot:19b,id:"minecraft:redstone"},{Count:64b,Slot:20b,id:"minecraft:redstone"},{Count:14b,Slot:21b,id:"minecraft:redstone"}]}`,
      `minecraft:trapped_chest{CustomName:'{"italic":false,"text":"13"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:64b,Slot:3b,id:"minecraft:redstone"},{Count:64b,Slot:4b,id:"minecraft:redstone"},{Count:64b,Slot:5b,id:"minecraft:redstone"},{Count:64b,Slot:6b,id:"minecraft:redstone"},{Count:64b,Slot:7b,id:"minecraft:redstone"},{Count:64b,Slot:8b,id:"minecraft:redstone"},{Count:64b,Slot:9b,id:"minecraft:redstone"},{Count:64b,Slot:10b,id:"minecraft:redstone"},{Count:64b,Slot:11b,id:"minecraft:redstone"},{Count:64b,Slot:12b,id:"minecraft:redstone"},{Count:64b,Slot:13b,id:"minecraft:redstone"},{Count:64b,Slot:14b,id:"minecraft:redstone"},{Count:64b,Slot:15b,id:"minecraft:redstone"},{Count:64b,Slot:16b,id:"minecraft:redstone"},{Count:64b,Slot:17b,id:"minecraft:redstone"},{Count:64b,Slot:18b,id:"minecraft:redstone"},{Count:64b,Slot:19b,id:"minecraft:redstone"},{Count:64b,Slot:20b,id:"minecraft:redstone"},{Count:64b,Slot:21b,id:"minecraft:redstone"},{Count:64b,Slot:22b,id:"minecraft:redstone"},{Count:10b,Slot:23b,id:"minecraft:redstone"}]}`,
      `minecraft:trapped_chest{CustomName:'{"italic":false,"text":"14"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:64b,Slot:3b,id:"minecraft:redstone"},{Count:64b,Slot:4b,id:"minecraft:redstone"},{Count:64b,Slot:5b,id:"minecraft:redstone"},{Count:64b,Slot:6b,id:"minecraft:redstone"},{Count:64b,Slot:7b,id:"minecraft:redstone"},{Count:64b,Slot:8b,id:"minecraft:redstone"},{Count:64b,Slot:9b,id:"minecraft:redstone"},{Count:64b,Slot:10b,id:"minecraft:redstone"},{Count:64b,Slot:11b,id:"minecraft:redstone"},{Count:64b,Slot:12b,id:"minecraft:redstone"},{Count:64b,Slot:13b,id:"minecraft:redstone"},{Count:64b,Slot:14b,id:"minecraft:redstone"},{Count:64b,Slot:15b,id:"minecraft:redstone"},{Count:64b,Slot:16b,id:"minecraft:redstone"},{Count:64b,Slot:17b,id:"minecraft:redstone"},{Count:64b,Slot:18b,id:"minecraft:redstone"},{Count:64b,Slot:19b,id:"minecraft:redstone"},{Count:64b,Slot:20b,id:"minecraft:redstone"},{Count:64b,Slot:21b,id:"minecraft:redstone"},{Count:64b,Slot:22b,id:"minecraft:redstone"},{Count:64b,Slot:23b,id:"minecraft:redstone"},{Count:64b,Slot:24b,id:"minecraft:redstone"},{Count:5b,Slot:25b,id:"minecraft:redstone"}]}`,
      `minecraft:trapped_chest{CustomName:'{"italic":false,"text":"15"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:64b,Slot:3b,id:"minecraft:redstone"},{Count:64b,Slot:4b,id:"minecraft:redstone"},{Count:64b,Slot:5b,id:"minecraft:redstone"},{Count:64b,Slot:6b,id:"minecraft:redstone"},{Count:64b,Slot:7b,id:"minecraft:redstone"},{Count:64b,Slot:8b,id:"minecraft:redstone"},{Count:64b,Slot:9b,id:"minecraft:redstone"},{Count:64b,Slot:10b,id:"minecraft:redstone"},{Count:64b,Slot:11b,id:"minecraft:redstone"},{Count:64b,Slot:12b,id:"minecraft:redstone"},{Count:64b,Slot:13b,id:"minecraft:redstone"},{Count:64b,Slot:14b,id:"minecraft:redstone"},{Count:64b,Slot:15b,id:"minecraft:redstone"},{Count:64b,Slot:16b,id:"minecraft:redstone"},{Count:64b,Slot:17b,id:"minecraft:redstone"},{Count:64b,Slot:18b,id:"minecraft:redstone"},{Count:64b,Slot:19b,id:"minecraft:redstone"},{Count:64b,Slot:20b,id:"minecraft:redstone"},{Count:64b,Slot:21b,id:"minecraft:redstone"},{Count:64b,Slot:22b,id:"minecraft:redstone"},{Count:64b,Slot:23b,id:"minecraft:redstone"},{Count:64b,Slot:24b,id:"minecraft:redstone"},{Count:64b,Slot:25b,id:"minecraft:redstone"},{Count:64b,Slot:26b,id:"minecraft:redstone"},{Count:0b,Slot:27b,id:"minecraft:redstone"}]}`,
    ];
    static fromSS(ss: number): string { return BlockDataDB.TRAPPED_CHEST._trapped_chestSS[ss]; }
  };

  static readonly SS_TRAPPED_CHEST0  = BlockDataDB.TRAPPED_CHEST._trapped_chestSS[0];
  static readonly SS_TRAPPED_CHEST1  = BlockDataDB.TRAPPED_CHEST._trapped_chestSS[1];
  static readonly SS_TRAPPED_CHEST2  = BlockDataDB.TRAPPED_CHEST._trapped_chestSS[2];
  static readonly SS_TRAPPED_CHEST3  = BlockDataDB.TRAPPED_CHEST._trapped_chestSS[3];
  static readonly SS_TRAPPED_CHEST4  = BlockDataDB.TRAPPED_CHEST._trapped_chestSS[4];
  static readonly SS_TRAPPED_CHEST5  = BlockDataDB.TRAPPED_CHEST._trapped_chestSS[5];
  static readonly SS_TRAPPED_CHEST6  = BlockDataDB.TRAPPED_CHEST._trapped_chestSS[6];
  static readonly SS_TRAPPED_CHEST7  = BlockDataDB.TRAPPED_CHEST._trapped_chestSS[7];
  static readonly SS_TRAPPED_CHEST8  = BlockDataDB.TRAPPED_CHEST._trapped_chestSS[8];
  static readonly SS_TRAPPED_CHEST9  = BlockDataDB.TRAPPED_CHEST._trapped_chestSS[9];
  static readonly SS_TRAPPED_CHEST10 = BlockDataDB.TRAPPED_CHEST._trapped_chestSS[10];
  static readonly SS_TRAPPED_CHEST11 = BlockDataDB.TRAPPED_CHEST._trapped_chestSS[11];
  static readonly SS_TRAPPED_CHEST12 = BlockDataDB.TRAPPED_CHEST._trapped_chestSS[12];
  static readonly SS_TRAPPED_CHEST13 = BlockDataDB.TRAPPED_CHEST._trapped_chestSS[13];
  static readonly SS_TRAPPED_CHEST14 = BlockDataDB.TRAPPED_CHEST._trapped_chestSS[14];
  static readonly SS_TRAPPED_CHEST15 = BlockDataDB.TRAPPED_CHEST._trapped_chestSS[15];

  static readonly CHEST = class {
    static readonly _chestSS: string[] = [
      `minecraft:chest{CustomName:'{"italic":false,"text":"0"}'}`,
      `minecraft:chest{CustomName:'{"italic":false,"text":"1"}',Items:[{Count:1b,Slot:0b,id:"minecraft:redstone"}]}`,
      `minecraft:chest{CustomName:'{"italic":false,"text":"2"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:60b,Slot:1b,id:"minecraft:redstone"}]}`,
      `minecraft:chest{CustomName:'{"italic":false,"text":"3"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:55b,Slot:3b,id:"minecraft:redstone"}]}`,
      `minecraft:chest{CustomName:'{"italic":false,"text":"4"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:64b,Slot:3b,id:"minecraft:redstone"},{Count:64b,Slot:4b,id:"minecraft:redstone"},{Count:51b,Slot:5b,id:"minecraft:redstone"}]}`,
      `minecraft:chest{CustomName:'{"italic":false,"text":"5"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:64b,Slot:3b,id:"minecraft:redstone"},{Count:64b,Slot:4b,id:"minecraft:redstone"},{Count:64b,Slot:5b,id:"minecraft:redstone"},{Count:64b,Slot:6b,id:"minecraft:redstone"},{Count:46b,Slot:7b,id:"minecraft:redstone"}]}`,
      `minecraft:chest{CustomName:'{"italic":false,"text":"6"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:64b,Slot:3b,id:"minecraft:redstone"},{Count:64b,Slot:4b,id:"minecraft:redstone"},{Count:64b,Slot:5b,id:"minecraft:redstone"},{Count:64b,Slot:6b,id:"minecraft:redstone"},{Count:64b,Slot:7b,id:"minecraft:redstone"},{Count:64b,Slot:8b,id:"minecraft:redstone"},{Count:42b,Slot:9b,id:"minecraft:redstone"}]}`,
      `minecraft:chest{CustomName:'{"italic":false,"text":"7"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:64b,Slot:3b,id:"minecraft:redstone"},{Count:64b,Slot:4b,id:"minecraft:redstone"},{Count:64b,Slot:5b,id:"minecraft:redstone"},{Count:64b,Slot:6b,id:"minecraft:redstone"},{Count:64b,Slot:7b,id:"minecraft:redstone"},{Count:64b,Slot:8b,id:"minecraft:redstone"},{Count:64b,Slot:9b,id:"minecraft:redstone"},{Count:64b,Slot:10b,id:"minecraft:redstone"},{Count:37b,Slot:11b,id:"minecraft:redstone"}]}`,
      `minecraft:chest{CustomName:'{"italic":false,"text":"8"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:64b,Slot:3b,id:"minecraft:redstone"},{Count:64b,Slot:4b,id:"minecraft:redstone"},{Count:64b,Slot:5b,id:"minecraft:redstone"},{Count:64b,Slot:6b,id:"minecraft:redstone"},{Count:64b,Slot:7b,id:"minecraft:redstone"},{Count:64b,Slot:8b,id:"minecraft:redstone"},{Count:64b,Slot:9b,id:"minecraft:redstone"},{Count:64b,Slot:10b,id:"minecraft:redstone"},{Count:64b,Slot:11b,id:"minecraft:redstone"},{Count:64b,Slot:12b,id:"minecraft:redstone"},{Count:32b,Slot:13b,id:"minecraft:redstone"}]}`,
      `minecraft:chest{CustomName:'{"italic":false,"text":"9"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:64b,Slot:3b,id:"minecraft:redstone"},{Count:64b,Slot:4b,id:"minecraft:redstone"},{Count:64b,Slot:5b,id:"minecraft:redstone"},{Count:64b,Slot:6b,id:"minecraft:redstone"},{Count:64b,Slot:7b,id:"minecraft:redstone"},{Count:64b,Slot:8b,id:"minecraft:redstone"},{Count:64b,Slot:9b,id:"minecraft:redstone"},{Count:64b,Slot:10b,id:"minecraft:redstone"},{Count:64b,Slot:11b,id:"minecraft:redstone"},{Count:64b,Slot:12b,id:"minecraft:redstone"},{Count:64b,Slot:13b,id:"minecraft:redstone"},{Count:64b,Slot:14b,id:"minecraft:redstone"},{Count:28b,Slot:15b,id:"minecraft:redstone"}]}`,
      `minecraft:chest{CustomName:'{"italic":false,"text":"10"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:64b,Slot:3b,id:"minecraft:redstone"},{Count:64b,Slot:4b,id:"minecraft:redstone"},{Count:64b,Slot:5b,id:"minecraft:redstone"},{Count:64b,Slot:6b,id:"minecraft:redstone"},{Count:64b,Slot:7b,id:"minecraft:redstone"},{Count:64b,Slot:8b,id:"minecraft:redstone"},{Count:64b,Slot:9b,id:"minecraft:redstone"},{Count:64b,Slot:10b,id:"minecraft:redstone"},{Count:64b,Slot:11b,id:"minecraft:redstone"},{Count:64b,Slot:12b,id:"minecraft:redstone"},{Count:64b,Slot:13b,id:"minecraft:redstone"},{Count:64b,Slot:14b,id:"minecraft:redstone"},{Count:64b,Slot:15b,id:"minecraft:redstone"},{Count:64b,Slot:16b,id:"minecraft:redstone"},{Count:23b,Slot:17b,id:"minecraft:redstone"}]}`,
      `minecraft:chest{CustomName:'{"italic":false,"text":"11"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:64b,Slot:3b,id:"minecraft:redstone"},{Count:64b,Slot:4b,id:"minecraft:redstone"},{Count:64b,Slot:5b,id:"minecraft:redstone"},{Count:64b,Slot:6b,id:"minecraft:redstone"},{Count:64b,Slot:7b,id:"minecraft:redstone"},{Count:64b,Slot:8b,id:"minecraft:redstone"},{Count:64b,Slot:9b,id:"minecraft:redstone"},{Count:64b,Slot:10b,id:"minecraft:redstone"},{Count:64b,Slot:11b,id:"minecraft:redstone"},{Count:64b,Slot:12b,id:"minecraft:redstone"},{Count:64b,Slot:13b,id:"minecraft:redstone"},{Count:64b,Slot:14b,id:"minecraft:redstone"},{Count:64b,Slot:15b,id:"minecraft:redstone"},{Count:64b,Slot:16b,id:"minecraft:redstone"},{Count:64b,Slot:17b,id:"minecraft:redstone"},{Count:64b,Slot:18b,id:"minecraft:redstone"},{Count:19b,Slot:19b,id:"minecraft:redstone"}]}`,
      `minecraft:chest{CustomName:'{"italic":false,"text":"12"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:64b,Slot:3b,id:"minecraft:redstone"},{Count:64b,Slot:4b,id:"minecraft:redstone"},{Count:64b,Slot:5b,id:"minecraft:redstone"},{Count:64b,Slot:6b,id:"minecraft:redstone"},{Count:64b,Slot:7b,id:"minecraft:redstone"},{Count:64b,Slot:8b,id:"minecraft:redstone"},{Count:64b,Slot:9b,id:"minecraft:redstone"},{Count:64b,Slot:10b,id:"minecraft:redstone"},{Count:64b,Slot:11b,id:"minecraft:redstone"},{Count:64b,Slot:12b,id:"minecraft:redstone"},{Count:64b,Slot:13b,id:"minecraft:redstone"},{Count:64b,Slot:14b,id:"minecraft:redstone"},{Count:64b,Slot:15b,id:"minecraft:redstone"},{Count:64b,Slot:16b,id:"minecraft:redstone"},{Count:64b,Slot:17b,id:"minecraft:redstone"},{Count:64b,Slot:18b,id:"minecraft:redstone"},{Count:64b,Slot:19b,id:"minecraft:redstone"},{Count:64b,Slot:20b,id:"minecraft:redstone"},{Count:14b,Slot:21b,id:"minecraft:redstone"}]}`,
      `minecraft:chest{CustomName:'{"italic":false,"text":"13"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:64b,Slot:3b,id:"minecraft:redstone"},{Count:64b,Slot:4b,id:"minecraft:redstone"},{Count:64b,Slot:5b,id:"minecraft:redstone"},{Count:64b,Slot:6b,id:"minecraft:redstone"},{Count:64b,Slot:7b,id:"minecraft:redstone"},{Count:64b,Slot:8b,id:"minecraft:redstone"},{Count:64b,Slot:9b,id:"minecraft:redstone"},{Count:64b,Slot:10b,id:"minecraft:redstone"},{Count:64b,Slot:11b,id:"minecraft:redstone"},{Count:64b,Slot:12b,id:"minecraft:redstone"},{Count:64b,Slot:13b,id:"minecraft:redstone"},{Count:64b,Slot:14b,id:"minecraft:redstone"},{Count:64b,Slot:15b,id:"minecraft:redstone"},{Count:64b,Slot:16b,id:"minecraft:redstone"},{Count:64b,Slot:17b,id:"minecraft:redstone"},{Count:64b,Slot:18b,id:"minecraft:redstone"},{Count:64b,Slot:19b,id:"minecraft:redstone"},{Count:64b,Slot:20b,id:"minecraft:redstone"},{Count:64b,Slot:21b,id:"minecraft:redstone"},{Count:64b,Slot:22b,id:"minecraft:redstone"},{Count:10b,Slot:23b,id:"minecraft:redstone"}]}`,
      `minecraft:chest{CustomName:'{"italic":false,"text":"14"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:64b,Slot:3b,id:"minecraft:redstone"},{Count:64b,Slot:4b,id:"minecraft:redstone"},{Count:64b,Slot:5b,id:"minecraft:redstone"},{Count:64b,Slot:6b,id:"minecraft:redstone"},{Count:64b,Slot:7b,id:"minecraft:redstone"},{Count:64b,Slot:8b,id:"minecraft:redstone"},{Count:64b,Slot:9b,id:"minecraft:redstone"},{Count:64b,Slot:10b,id:"minecraft:redstone"},{Count:64b,Slot:11b,id:"minecraft:redstone"},{Count:64b,Slot:12b,id:"minecraft:redstone"},{Count:64b,Slot:13b,id:"minecraft:redstone"},{Count:64b,Slot:14b,id:"minecraft:redstone"},{Count:64b,Slot:15b,id:"minecraft:redstone"},{Count:64b,Slot:16b,id:"minecraft:redstone"},{Count:64b,Slot:17b,id:"minecraft:redstone"},{Count:64b,Slot:18b,id:"minecraft:redstone"},{Count:64b,Slot:19b,id:"minecraft:redstone"},{Count:64b,Slot:20b,id:"minecraft:redstone"},{Count:64b,Slot:21b,id:"minecraft:redstone"},{Count:64b,Slot:22b,id:"minecraft:redstone"},{Count:64b,Slot:23b,id:"minecraft:redstone"},{Count:64b,Slot:24b,id:"minecraft:redstone"},{Count:5b,Slot:25b,id:"minecraft:redstone"}]}`,
      `minecraft:chest{CustomName:'{"italic":false,"text":"15"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:64b,Slot:3b,id:"minecraft:redstone"},{Count:64b,Slot:4b,id:"minecraft:redstone"},{Count:64b,Slot:5b,id:"minecraft:redstone"},{Count:64b,Slot:6b,id:"minecraft:redstone"},{Count:64b,Slot:7b,id:"minecraft:redstone"},{Count:64b,Slot:8b,id:"minecraft:redstone"},{Count:64b,Slot:9b,id:"minecraft:redstone"},{Count:64b,Slot:10b,id:"minecraft:redstone"},{Count:64b,Slot:11b,id:"minecraft:redstone"},{Count:64b,Slot:12b,id:"minecraft:redstone"},{Count:64b,Slot:13b,id:"minecraft:redstone"},{Count:64b,Slot:14b,id:"minecraft:redstone"},{Count:64b,Slot:15b,id:"minecraft:redstone"},{Count:64b,Slot:16b,id:"minecraft:redstone"},{Count:64b,Slot:17b,id:"minecraft:redstone"},{Count:64b,Slot:18b,id:"minecraft:redstone"},{Count:64b,Slot:19b,id:"minecraft:redstone"},{Count:64b,Slot:20b,id:"minecraft:redstone"},{Count:64b,Slot:21b,id:"minecraft:redstone"},{Count:64b,Slot:22b,id:"minecraft:redstone"},{Count:64b,Slot:23b,id:"minecraft:redstone"},{Count:64b,Slot:24b,id:"minecraft:redstone"},{Count:64b,Slot:25b,id:"minecraft:redstone"},{Count:64b,Slot:26b,id:"minecraft:redstone"},{Count:0b,Slot:27b,id:"minecraft:redstone"}]}`,
    ];
    static fromSS(ss: number): string { return BlockDataDB.CHEST._chestSS[ss]; }
  };

  static readonly SS_CHEST0  = BlockDataDB.CHEST._chestSS[0];
  static readonly SS_CHEST1  = BlockDataDB.CHEST._chestSS[1];
  static readonly SS_CHEST2  = BlockDataDB.CHEST._chestSS[2];
  static readonly SS_CHEST3  = BlockDataDB.CHEST._chestSS[3];
  static readonly SS_CHEST4  = BlockDataDB.CHEST._chestSS[4];
  static readonly SS_CHEST5  = BlockDataDB.CHEST._chestSS[5];
  static readonly SS_CHEST6  = BlockDataDB.CHEST._chestSS[6];
  static readonly SS_CHEST7  = BlockDataDB.CHEST._chestSS[7];
  static readonly SS_CHEST8  = BlockDataDB.CHEST._chestSS[8];
  static readonly SS_CHEST9  = BlockDataDB.CHEST._chestSS[9];
  static readonly SS_CHEST10 = BlockDataDB.CHEST._chestSS[10];
  static readonly SS_CHEST11 = BlockDataDB.CHEST._chestSS[11];
  static readonly SS_CHEST12 = BlockDataDB.CHEST._chestSS[12];
  static readonly SS_CHEST13 = BlockDataDB.CHEST._chestSS[13];
  static readonly SS_CHEST14 = BlockDataDB.CHEST._chestSS[14];
  static readonly SS_CHEST15 = BlockDataDB.CHEST._chestSS[15];

  static readonly SHULKER_BOX = class {
    static readonly _shulker_boxSS: string[] = [
      `minecraft:shulker_box{CustomName:'{"italic":false,"text":"0"}'}`,
      `minecraft:shulker_box{CustomName:'{"italic":false,"text":"1"}',Items:[{Count:1b,Slot:0b,id:"minecraft:redstone"}]}`,
      `minecraft:shulker_box{CustomName:'{"italic":false,"text":"2"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:60b,Slot:1b,id:"minecraft:redstone"}]}`,
      `minecraft:shulker_box{CustomName:'{"italic":false,"text":"3"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:55b,Slot:3b,id:"minecraft:redstone"}]}`,
      `minecraft:shulker_box{CustomName:'{"italic":false,"text":"4"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:64b,Slot:3b,id:"minecraft:redstone"},{Count:64b,Slot:4b,id:"minecraft:redstone"},{Count:51b,Slot:5b,id:"minecraft:redstone"}]}`,
      `minecraft:shulker_box{CustomName:'{"italic":false,"text":"5"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:64b,Slot:3b,id:"minecraft:redstone"},{Count:64b,Slot:4b,id:"minecraft:redstone"},{Count:64b,Slot:5b,id:"minecraft:redstone"},{Count:64b,Slot:6b,id:"minecraft:redstone"},{Count:46b,Slot:7b,id:"minecraft:redstone"}]}`,
      `minecraft:shulker_box{CustomName:'{"italic":false,"text":"6"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:64b,Slot:3b,id:"minecraft:redstone"},{Count:64b,Slot:4b,id:"minecraft:redstone"},{Count:64b,Slot:5b,id:"minecraft:redstone"},{Count:64b,Slot:6b,id:"minecraft:redstone"},{Count:64b,Slot:7b,id:"minecraft:redstone"},{Count:64b,Slot:8b,id:"minecraft:redstone"},{Count:42b,Slot:9b,id:"minecraft:redstone"}]}`,
      `minecraft:shulker_box{CustomName:'{"italic":false,"text":"7"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:64b,Slot:3b,id:"minecraft:redstone"},{Count:64b,Slot:4b,id:"minecraft:redstone"},{Count:64b,Slot:5b,id:"minecraft:redstone"},{Count:64b,Slot:6b,id:"minecraft:redstone"},{Count:64b,Slot:7b,id:"minecraft:redstone"},{Count:64b,Slot:8b,id:"minecraft:redstone"},{Count:64b,Slot:9b,id:"minecraft:redstone"},{Count:64b,Slot:10b,id:"minecraft:redstone"},{Count:37b,Slot:11b,id:"minecraft:redstone"}]}`,
      `minecraft:shulker_box{CustomName:'{"italic":false,"text":"8"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:64b,Slot:3b,id:"minecraft:redstone"},{Count:64b,Slot:4b,id:"minecraft:redstone"},{Count:64b,Slot:5b,id:"minecraft:redstone"},{Count:64b,Slot:6b,id:"minecraft:redstone"},{Count:64b,Slot:7b,id:"minecraft:redstone"},{Count:64b,Slot:8b,id:"minecraft:redstone"},{Count:64b,Slot:9b,id:"minecraft:redstone"},{Count:64b,Slot:10b,id:"minecraft:redstone"},{Count:64b,Slot:11b,id:"minecraft:redstone"},{Count:64b,Slot:12b,id:"minecraft:redstone"},{Count:32b,Slot:13b,id:"minecraft:redstone"}]}`,
      `minecraft:shulker_box{CustomName:'{"italic":false,"text":"9"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:64b,Slot:3b,id:"minecraft:redstone"},{Count:64b,Slot:4b,id:"minecraft:redstone"},{Count:64b,Slot:5b,id:"minecraft:redstone"},{Count:64b,Slot:6b,id:"minecraft:redstone"},{Count:64b,Slot:7b,id:"minecraft:redstone"},{Count:64b,Slot:8b,id:"minecraft:redstone"},{Count:64b,Slot:9b,id:"minecraft:redstone"},{Count:64b,Slot:10b,id:"minecraft:redstone"},{Count:64b,Slot:11b,id:"minecraft:redstone"},{Count:64b,Slot:12b,id:"minecraft:redstone"},{Count:64b,Slot:13b,id:"minecraft:redstone"},{Count:64b,Slot:14b,id:"minecraft:redstone"},{Count:28b,Slot:15b,id:"minecraft:redstone"}]}`,
      `minecraft:shulker_box{CustomName:'{"italic":false,"text":"10"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:64b,Slot:3b,id:"minecraft:redstone"},{Count:64b,Slot:4b,id:"minecraft:redstone"},{Count:64b,Slot:5b,id:"minecraft:redstone"},{Count:64b,Slot:6b,id:"minecraft:redstone"},{Count:64b,Slot:7b,id:"minecraft:redstone"},{Count:64b,Slot:8b,id:"minecraft:redstone"},{Count:64b,Slot:9b,id:"minecraft:redstone"},{Count:64b,Slot:10b,id:"minecraft:redstone"},{Count:64b,Slot:11b,id:"minecraft:redstone"},{Count:64b,Slot:12b,id:"minecraft:redstone"},{Count:64b,Slot:13b,id:"minecraft:redstone"},{Count:64b,Slot:14b,id:"minecraft:redstone"},{Count:64b,Slot:15b,id:"minecraft:redstone"},{Count:64b,Slot:16b,id:"minecraft:redstone"},{Count:23b,Slot:17b,id:"minecraft:redstone"}]}`,
      `minecraft:shulker_box{CustomName:'{"italic":false,"text":"11"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:64b,Slot:3b,id:"minecraft:redstone"},{Count:64b,Slot:4b,id:"minecraft:redstone"},{Count:64b,Slot:5b,id:"minecraft:redstone"},{Count:64b,Slot:6b,id:"minecraft:redstone"},{Count:64b,Slot:7b,id:"minecraft:redstone"},{Count:64b,Slot:8b,id:"minecraft:redstone"},{Count:64b,Slot:9b,id:"minecraft:redstone"},{Count:64b,Slot:10b,id:"minecraft:redstone"},{Count:64b,Slot:11b,id:"minecraft:redstone"},{Count:64b,Slot:12b,id:"minecraft:redstone"},{Count:64b,Slot:13b,id:"minecraft:redstone"},{Count:64b,Slot:14b,id:"minecraft:redstone"},{Count:64b,Slot:15b,id:"minecraft:redstone"},{Count:64b,Slot:16b,id:"minecraft:redstone"},{Count:64b,Slot:17b,id:"minecraft:redstone"},{Count:64b,Slot:18b,id:"minecraft:redstone"},{Count:19b,Slot:19b,id:"minecraft:redstone"}]}`,
      `minecraft:shulker_box{CustomName:'{"italic":false,"text":"12"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:64b,Slot:3b,id:"minecraft:redstone"},{Count:64b,Slot:4b,id:"minecraft:redstone"},{Count:64b,Slot:5b,id:"minecraft:redstone"},{Count:64b,Slot:6b,id:"minecraft:redstone"},{Count:64b,Slot:7b,id:"minecraft:redstone"},{Count:64b,Slot:8b,id:"minecraft:redstone"},{Count:64b,Slot:9b,id:"minecraft:redstone"},{Count:64b,Slot:10b,id:"minecraft:redstone"},{Count:64b,Slot:11b,id:"minecraft:redstone"},{Count:64b,Slot:12b,id:"minecraft:redstone"},{Count:64b,Slot:13b,id:"minecraft:redstone"},{Count:64b,Slot:14b,id:"minecraft:redstone"},{Count:64b,Slot:15b,id:"minecraft:redstone"},{Count:64b,Slot:16b,id:"minecraft:redstone"},{Count:64b,Slot:17b,id:"minecraft:redstone"},{Count:64b,Slot:18b,id:"minecraft:redstone"},{Count:64b,Slot:19b,id:"minecraft:redstone"},{Count:64b,Slot:20b,id:"minecraft:redstone"},{Count:14b,Slot:21b,id:"minecraft:redstone"}]}`,
      `minecraft:shulker_box{CustomName:'{"italic":false,"text":"13"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:64b,Slot:3b,id:"minecraft:redstone"},{Count:64b,Slot:4b,id:"minecraft:redstone"},{Count:64b,Slot:5b,id:"minecraft:redstone"},{Count:64b,Slot:6b,id:"minecraft:redstone"},{Count:64b,Slot:7b,id:"minecraft:redstone"},{Count:64b,Slot:8b,id:"minecraft:redstone"},{Count:64b,Slot:9b,id:"minecraft:redstone"},{Count:64b,Slot:10b,id:"minecraft:redstone"},{Count:64b,Slot:11b,id:"minecraft:redstone"},{Count:64b,Slot:12b,id:"minecraft:redstone"},{Count:64b,Slot:13b,id:"minecraft:redstone"},{Count:64b,Slot:14b,id:"minecraft:redstone"},{Count:64b,Slot:15b,id:"minecraft:redstone"},{Count:64b,Slot:16b,id:"minecraft:redstone"},{Count:64b,Slot:17b,id:"minecraft:redstone"},{Count:64b,Slot:18b,id:"minecraft:redstone"},{Count:64b,Slot:19b,id:"minecraft:redstone"},{Count:64b,Slot:20b,id:"minecraft:redstone"},{Count:64b,Slot:21b,id:"minecraft:redstone"},{Count:64b,Slot:22b,id:"minecraft:redstone"},{Count:10b,Slot:23b,id:"minecraft:redstone"}]}`,
      `minecraft:shulker_box{CustomName:'{"italic":false,"text":"14"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:64b,Slot:3b,id:"minecraft:redstone"},{Count:64b,Slot:4b,id:"minecraft:redstone"},{Count:64b,Slot:5b,id:"minecraft:redstone"},{Count:64b,Slot:6b,id:"minecraft:redstone"},{Count:64b,Slot:7b,id:"minecraft:redstone"},{Count:64b,Slot:8b,id:"minecraft:redstone"},{Count:64b,Slot:9b,id:"minecraft:redstone"},{Count:64b,Slot:10b,id:"minecraft:redstone"},{Count:64b,Slot:11b,id:"minecraft:redstone"},{Count:64b,Slot:12b,id:"minecraft:redstone"},{Count:64b,Slot:13b,id:"minecraft:redstone"},{Count:64b,Slot:14b,id:"minecraft:redstone"},{Count:64b,Slot:15b,id:"minecraft:redstone"},{Count:64b,Slot:16b,id:"minecraft:redstone"},{Count:64b,Slot:17b,id:"minecraft:redstone"},{Count:64b,Slot:18b,id:"minecraft:redstone"},{Count:64b,Slot:19b,id:"minecraft:redstone"},{Count:64b,Slot:20b,id:"minecraft:redstone"},{Count:64b,Slot:21b,id:"minecraft:redstone"},{Count:64b,Slot:22b,id:"minecraft:redstone"},{Count:64b,Slot:23b,id:"minecraft:redstone"},{Count:64b,Slot:24b,id:"minecraft:redstone"},{Count:5b,Slot:25b,id:"minecraft:redstone"}]}`,
      `minecraft:shulker_box{CustomName:'{"italic":false,"text":"15"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:64b,Slot:3b,id:"minecraft:redstone"},{Count:64b,Slot:4b,id:"minecraft:redstone"},{Count:64b,Slot:5b,id:"minecraft:redstone"},{Count:64b,Slot:6b,id:"minecraft:redstone"},{Count:64b,Slot:7b,id:"minecraft:redstone"},{Count:64b,Slot:8b,id:"minecraft:redstone"},{Count:64b,Slot:9b,id:"minecraft:redstone"},{Count:64b,Slot:10b,id:"minecraft:redstone"},{Count:64b,Slot:11b,id:"minecraft:redstone"},{Count:64b,Slot:12b,id:"minecraft:redstone"},{Count:64b,Slot:13b,id:"minecraft:redstone"},{Count:64b,Slot:14b,id:"minecraft:redstone"},{Count:64b,Slot:15b,id:"minecraft:redstone"},{Count:64b,Slot:16b,id:"minecraft:redstone"},{Count:64b,Slot:17b,id:"minecraft:redstone"},{Count:64b,Slot:18b,id:"minecraft:redstone"},{Count:64b,Slot:19b,id:"minecraft:redstone"},{Count:64b,Slot:20b,id:"minecraft:redstone"},{Count:64b,Slot:21b,id:"minecraft:redstone"},{Count:64b,Slot:22b,id:"minecraft:redstone"},{Count:64b,Slot:23b,id:"minecraft:redstone"},{Count:64b,Slot:24b,id:"minecraft:redstone"},{Count:64b,Slot:25b,id:"minecraft:redstone"},{Count:64b,Slot:26b,id:"minecraft:redstone"},{Count:0b,Slot:27b,id:"minecraft:redstone"}]}`,
    ];
    static fromSS(ss: number): string { return BlockDataDB.SHULKER_BOX._shulker_boxSS[ss]; }
  };

  static readonly SS_SHULKER_BOX0  = BlockDataDB.SHULKER_BOX._shulker_boxSS[0];
  static readonly SS_SHULKER_BOX1  = BlockDataDB.SHULKER_BOX._shulker_boxSS[1];
  static readonly SS_SHULKER_BOX2  = BlockDataDB.SHULKER_BOX._shulker_boxSS[2];
  static readonly SS_SHULKER_BOX3  = BlockDataDB.SHULKER_BOX._shulker_boxSS[3];
  static readonly SS_SHULKER_BOX4  = BlockDataDB.SHULKER_BOX._shulker_boxSS[4];
  static readonly SS_SHULKER_BOX5  = BlockDataDB.SHULKER_BOX._shulker_boxSS[5];
  static readonly SS_SHULKER_BOX6  = BlockDataDB.SHULKER_BOX._shulker_boxSS[6];
  static readonly SS_SHULKER_BOX7  = BlockDataDB.SHULKER_BOX._shulker_boxSS[7];
  static readonly SS_SHULKER_BOX8  = BlockDataDB.SHULKER_BOX._shulker_boxSS[8];
  static readonly SS_SHULKER_BOX9  = BlockDataDB.SHULKER_BOX._shulker_boxSS[9];
  static readonly SS_SHULKER_BOX10 = BlockDataDB.SHULKER_BOX._shulker_boxSS[10];
  static readonly SS_SHULKER_BOX11 = BlockDataDB.SHULKER_BOX._shulker_boxSS[11];
  static readonly SS_SHULKER_BOX12 = BlockDataDB.SHULKER_BOX._shulker_boxSS[12];
  static readonly SS_SHULKER_BOX13 = BlockDataDB.SHULKER_BOX._shulker_boxSS[13];
  static readonly SS_SHULKER_BOX14 = BlockDataDB.SHULKER_BOX._shulker_boxSS[14];
  static readonly SS_SHULKER_BOX15 = BlockDataDB.SHULKER_BOX._shulker_boxSS[15];

  static readonly SMOKER = class {
    static readonly _smokerSS: string[] = [
      `minecraft:smoker{CustomName:'{"italic":false,"text":"0"}'}`,
      `minecraft:smoker{CustomName:'{"italic":false,"text":"1"}',Items:[{Count:1b,Slot:0b,id:"minecraft:redstone"}]}`,
      `minecraft:smoker{CustomName:'{"italic":false,"text":"2"}',Items:[{Count:14b,Slot:0b,id:"minecraft:redstone"}]}`,
      `minecraft:smoker{CustomName:'{"italic":false,"text":"3"}',Items:[{Count:28b,Slot:0b,id:"minecraft:redstone"}]}`,
      `minecraft:smoker{CustomName:'{"italic":false,"text":"4"}',Items:[{Count:42b,Slot:0b,id:"minecraft:redstone"}]}`,
      `minecraft:smoker{CustomName:'{"italic":false,"text":"5"}',Items:[{Count:55b,Slot:0b,id:"minecraft:redstone"}]}`,
      `minecraft:smoker{CustomName:'{"italic":false,"text":"6"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:5b,Slot:1b,id:"minecraft:redstone"}]}`,
      `minecraft:smoker{CustomName:'{"italic":false,"text":"7"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:19b,Slot:1b,id:"minecraft:redstone"}]}`,
      `minecraft:smoker{CustomName:'{"italic":false,"text":"8"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:32b,Slot:1b,id:"minecraft:redstone"}]}`,
      `minecraft:smoker{CustomName:'{"italic":false,"text":"9"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:46b,Slot:1b,id:"minecraft:redstone"}]}`,
      `minecraft:smoker{CustomName:'{"italic":false,"text":"10"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:60b,Slot:1b,id:"minecraft:redstone"}]}`,
      `minecraft:smoker{CustomName:'{"italic":false,"text":"11"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:10b,Slot:2b,id:"minecraft:redstone"}]}`,
      `minecraft:smoker{CustomName:'{"italic":false,"text":"12"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:23b,Slot:2b,id:"minecraft:redstone"}]}`,
      `minecraft:smoker{CustomName:'{"italic":false,"text":"13"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:37b,Slot:2b,id:"minecraft:redstone"}]}`,
      `minecraft:smoker{CustomName:'{"italic":false,"text":"14"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:51b,Slot:2b,id:"minecraft:redstone"}]}`,
      `minecraft:smoker{CustomName:'{"italic":false,"text":"15"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:0b,Slot:3b,id:"minecraft:redstone"}]}`,
    ];
    static fromSS(ss: number): string { return BlockDataDB.SMOKER._smokerSS[ss]; }
  };

  static readonly SS_SMOKER0  = BlockDataDB.SMOKER._smokerSS[0];
  static readonly SS_SMOKER1  = BlockDataDB.SMOKER._smokerSS[1];
  static readonly SS_SMOKER2  = BlockDataDB.SMOKER._smokerSS[2];
  static readonly SS_SMOKER3  = BlockDataDB.SMOKER._smokerSS[3];
  static readonly SS_SMOKER4  = BlockDataDB.SMOKER._smokerSS[4];
  static readonly SS_SMOKER5  = BlockDataDB.SMOKER._smokerSS[5];
  static readonly SS_SMOKER6  = BlockDataDB.SMOKER._smokerSS[6];
  static readonly SS_SMOKER7  = BlockDataDB.SMOKER._smokerSS[7];
  static readonly SS_SMOKER8  = BlockDataDB.SMOKER._smokerSS[8];
  static readonly SS_SMOKER9  = BlockDataDB.SMOKER._smokerSS[9];
  static readonly SS_SMOKER10 = BlockDataDB.SMOKER._smokerSS[10];
  static readonly SS_SMOKER11 = BlockDataDB.SMOKER._smokerSS[11];
  static readonly SS_SMOKER12 = BlockDataDB.SMOKER._smokerSS[12];
  static readonly SS_SMOKER13 = BlockDataDB.SMOKER._smokerSS[13];
  static readonly SS_SMOKER14 = BlockDataDB.SMOKER._smokerSS[14];
  static readonly SS_SMOKER15 = BlockDataDB.SMOKER._smokerSS[15];

  static readonly BLAST_FURNACE = class {
    static readonly _blast_furnaceSS: string[] = [
      `minecraft:blast_furnace{CustomName:'{"italic":false,"text":"0"}'}`,
      `minecraft:blast_furnace{CustomName:'{"italic":false,"text":"1"}',Items:[{Count:1b,Slot:0b,id:"minecraft:redstone"}]}`,
      `minecraft:blast_furnace{CustomName:'{"italic":false,"text":"2"}',Items:[{Count:14b,Slot:0b,id:"minecraft:redstone"}]}`,
      `minecraft:blast_furnace{CustomName:'{"italic":false,"text":"3"}',Items:[{Count:28b,Slot:0b,id:"minecraft:redstone"}]}`,
      `minecraft:blast_furnace{CustomName:'{"italic":false,"text":"4"}',Items:[{Count:42b,Slot:0b,id:"minecraft:redstone"}]}`,
      `minecraft:blast_furnace{CustomName:'{"italic":false,"text":"5"}',Items:[{Count:55b,Slot:0b,id:"minecraft:redstone"}]}`,
      `minecraft:blast_furnace{CustomName:'{"italic":false,"text":"6"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:5b,Slot:1b,id:"minecraft:redstone"}]}`,
      `minecraft:blast_furnace{CustomName:'{"italic":false,"text":"7"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:19b,Slot:1b,id:"minecraft:redstone"}]}`,
      `minecraft:blast_furnace{CustomName:'{"italic":false,"text":"8"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:32b,Slot:1b,id:"minecraft:redstone"}]}`,
      `minecraft:blast_furnace{CustomName:'{"italic":false,"text":"9"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:46b,Slot:1b,id:"minecraft:redstone"}]}`,
      `minecraft:blast_furnace{CustomName:'{"italic":false,"text":"10"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:60b,Slot:1b,id:"minecraft:redstone"}]}`,
      `minecraft:blast_furnace{CustomName:'{"italic":false,"text":"11"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:10b,Slot:2b,id:"minecraft:redstone"}]}`,
      `minecraft:blast_furnace{CustomName:'{"italic":false,"text":"12"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:23b,Slot:2b,id:"minecraft:redstone"}]}`,
      `minecraft:blast_furnace{CustomName:'{"italic":false,"text":"13"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:37b,Slot:2b,id:"minecraft:redstone"}]}`,
      `minecraft:blast_furnace{CustomName:'{"italic":false,"text":"14"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:51b,Slot:2b,id:"minecraft:redstone"}]}`,
      `minecraft:blast_furnace{CustomName:'{"italic":false,"text":"15"}',Items:[{Count:64b,Slot:0b,id:"minecraft:redstone"},{Count:64b,Slot:1b,id:"minecraft:redstone"},{Count:64b,Slot:2b,id:"minecraft:redstone"},{Count:0b,Slot:3b,id:"minecraft:redstone"}]}`,
    ];
    static fromSS(ss: number): string { return BlockDataDB.BLAST_FURNACE._blast_furnaceSS[ss]; }
  };

  static readonly SS_BLAST_FURNACE0  = BlockDataDB.BLAST_FURNACE._blast_furnaceSS[0];
  static readonly SS_BLAST_FURNACE1  = BlockDataDB.BLAST_FURNACE._blast_furnaceSS[1];
  static readonly SS_BLAST_FURNACE2  = BlockDataDB.BLAST_FURNACE._blast_furnaceSS[2];
  static readonly SS_BLAST_FURNACE3  = BlockDataDB.BLAST_FURNACE._blast_furnaceSS[3];
  static readonly SS_BLAST_FURNACE4  = BlockDataDB.BLAST_FURNACE._blast_furnaceSS[4];
  static readonly SS_BLAST_FURNACE5  = BlockDataDB.BLAST_FURNACE._blast_furnaceSS[5];
  static readonly SS_BLAST_FURNACE6  = BlockDataDB.BLAST_FURNACE._blast_furnaceSS[6];
  static readonly SS_BLAST_FURNACE7  = BlockDataDB.BLAST_FURNACE._blast_furnaceSS[7];
  static readonly SS_BLAST_FURNACE8  = BlockDataDB.BLAST_FURNACE._blast_furnaceSS[8];
  static readonly SS_BLAST_FURNACE9  = BlockDataDB.BLAST_FURNACE._blast_furnaceSS[9];
  static readonly SS_BLAST_FURNACE10 = BlockDataDB.BLAST_FURNACE._blast_furnaceSS[10];
  static readonly SS_BLAST_FURNACE11 = BlockDataDB.BLAST_FURNACE._blast_furnaceSS[11];
  static readonly SS_BLAST_FURNACE12 = BlockDataDB.BLAST_FURNACE._blast_furnaceSS[12];
  static readonly SS_BLAST_FURNACE13 = BlockDataDB.BLAST_FURNACE._blast_furnaceSS[13];
  static readonly SS_BLAST_FURNACE14 = BlockDataDB.BLAST_FURNACE._blast_furnaceSS[14];
  static readonly SS_BLAST_FURNACE15 = BlockDataDB.BLAST_FURNACE._blast_furnaceSS[15];
}
