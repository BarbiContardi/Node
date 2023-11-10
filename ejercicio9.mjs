function luckyDraw(player) {
  return new Promise((resolve, reject) => {
    const win = Boolean(Math.round(Math.random()));
    process.nextTick(() => {
      if (win) {
        resolve(`${player} ganó un premio en el sorteo.`);
      } else {
        reject(new Error(`${player} perdió en el sorteo.`));
      }
    });
  });
}
async function getResults() {
  const players = ["Tina", "Jorge", "Julien"];

  players.forEach(async (player) => {
    try {
      const result = await luckyDraw(player);
      console.log(result);
    } catch (error) {
      console.error(error.message);
    }
  });
}

getResults();
