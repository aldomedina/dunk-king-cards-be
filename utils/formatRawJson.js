const formatRawJson = (raw, obj) =>
  raw.map((el) => {
    const positions = [];

    if (el["#Pos-1"] !== "-") positions.push(el["#Pos-1"]);
    if (el["#Pos-2"] !== "-") positions.push(el["#Pos-2"]);
    if (el["#Pos-3"] !== "-") positions.push(el["#Pos-3"]);

    obj[el["#id"]] = {
      ["id"]: el["#id"],
      ["Romaji"]: el["#Romaji"],
      ["Katakana"]: el["#Katakana"],
      ["Cont"]: el["#Cont"],
      ["Legacy"]: el["#Legacy"],
      ["Ciudad"]: el["#Ciudad"],
      ["BG_URL"]: el["#BG_URL"],
      ["PLAYER_URL"]: el["#PLAYER_URL"],
      positions,
      dices: {
        1: el["#Dados-1"],
        2: el["#Dados-2"],
        3: el["#Dados-3"],
      },
      stats: {
        low: {
          ["PTS"]: { points: el["#PTS-1"], level: el["#PTS-1"] },
          ["%TL"]: { points: el["#%TL-1"], level: el["#%TL-1"] },
          ["3P"]: { points: el["#3P-1"], level: el["#3P-1"] },
          ["ROB"]: { points: el["#ROB-1"], level: el["#ROB-1"] },
          ["AST"]: { points: el["#AST-1"], level: el["#AST-1"] },
          ["RT"]: { points: el["#RT-1"], level: el["#RT-1"] },
          ["BLK"]: { points: el["#BLK-1"], level: el["#BLK-1"] },
        },
        medium: {
          ["PTS"]: { points: el["#PTS-2"], level: el["#PTS-2"] },
          ["%TL"]: { points: el["#%TL-2"], level: el["#%TL-2"] },
          ["3P"]: { points: el["#3P-2"], level: el["#3P-2"] },
          ["ROB"]: { points: el["#ROB-2"], level: el["#ROB-2"] },
          ["AST"]: { points: el["#AST-2"], level: el["#AST-2"] },
          ["RT"]: { points: el["#RT-2"], level: el["#RT-2"] },
          ["BLK"]: { points: el["#BLK-2"], level: el["#BLK-2"] },
        },
        high: {
          ["PTS"]: { points: el["#PTS-3"], level: el["#PTS-3"] },
          ["%TL"]: { points: el["#%TL-3"], level: el["#%TL-3"] },
          ["3P"]: { points: el["#3P-3"], level: el["#3P-3"] },
          ["ROB"]: { points: el["#ROB-3"], level: el["#ROB-3"] },
          ["AST"]: { points: el["#AST-3"], level: el["#AST-3"] },
          ["RT"]: { points: el["#RT-3"], level: el["#RT-3"] },
          ["BLK"]: { points: el["#BLK-3"], level: el["#BLK-3"] },
        },
      },
    };
  });
