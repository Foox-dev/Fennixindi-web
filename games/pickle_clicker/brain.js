var clicker = {
  pickles: 0,
  avg: 0,
  click_pickle: 1,
  upgrades: {
    pickle_skills: {
      amount: 0,
      cost: 300,
      gps: 0,
      unlocked: false,
      unlockat: 0,
      name: "Click Multiplier"
    },
    pickler_machine: {
      amount: 0,
      cost: 100,
      gps: 0.25,
      unlocked: false,
      unlockat: 0,
      name: "Extra Picklers"
    },
    pickler_monkey: {
      amount: 0,
      cost: 300,
      gps: 1,
      unlocked: false,
      unlockat: 1,
      name: "Pickler Monkey"
    },
    pickler_plat: {
      amount: 0,
      cost: 500,
      gps: 2,
      unlocked: false,
      unlockat: 1,
      name: "Pickle Plantation"
    },
    pickler_factory: {
      amount: 0,
      cost: 1500,
      gps: 3.25,
      unlocked: false,
      unlockat: 800,
      name: "Pickling Factory"
    },
    picklers_insomnia: {
      amount: 0,
      cost: 3000,
      gps: 5,
      unlocked: false,
      unlockat: 2000,
      name: "Picklers Insomnia"
    },
    pickle_pit: {
      amount: 0,
      cost: 5500,
      gps: 10,
      unlocked: false,
      unlockat: 3500,
      name: "Pickle Pit  "
    },
    corrupted_pickle: {
      amount: 0,
      cost: 8000,
      gps: 35,
      unlocked: false,
      unlockat: 7000,
      name: "Corrupted Pickle"
    },
    spice_mixer: {
      amount: 0,
      cost: 10000,
      gps: 80,
      unlocked: false,
      unlockat: 7500,
      name: "Spice Mixer"
    },
    pickle_empire: {
      amount: 0,
      cost: 15500,
      gps: 150,
      unlocked: false,
      unlockat: 12000,
      name: "Pickle Empire"
    },
    glowing_salt: {
      amount: 0,
      cost: 20000,
      gps: 200,
      unlocked: false,
      unlockat: 17000,
      name: "Glowing Salt"
    },
    atomic_vinegar: {
      amount: 0,
      cost: 32000,
      gps: 300,
      unlocked: false,
      unlockat: 28000,
      name: "Atomic Vinegar"
    },
  },
  achievements: [{ req: "clicker.pickles>=1", gotten: false, title: "A Big Mistake", text: "Play Pickle Clicker." },
  { req: "clicker.pickles>=1000", gotten: false, title: "Now It Begins...", text: "Get 1000 Pickles." },
  { req: "clicker.pickles>=5000", gotten: false, title: "Pickle Priest", text: "Get 5000 Pickles" },
  { req: "clicker.upgrades.picklers_insomnia.amount>=1", gotten: false, title: "Insomniac", text: "Buy Pickle Insomnia." },
  { req: "clicker.upgrades.corrupted_pickle.amount>=1", gotten: false, title: "No Life", text: "Buy a Corrupted Pickle." },
  { req: "clicker.upgrades.atomic_vinegar.amount>=1", gotten: false, title: "Atomic Cucumbers", text: "Buy Atomic Vinegar." }]
};
function pickle_clicked(thing) {
  var string = numbro(1000).format({ thousandSeparated: true });
  console.log("Pickle Has Been Clicked");
  if (clicker.upgrades[thing].cost <= clicker.pickles) {
    if ([thing] == 'pickle_skills') {
      clicker.pickles -= clicker.upgrades.pickle_skills.cost;
      clicker.upgrades.pickle_skills.amount++;
      clicker.upgrades[thing].cost += Math.round(clicker.upgrades[thing].cost * 0.15);
      clicker.click_pickle++
      update_upgrades();
    } else {
      clicker.pickles -= clicker.upgrades[thing].cost;
      clicker.avg += clicker.upgrades[thing].gps;
      clicker.upgrades[thing].amount++;
      clicker.upgrades[thing].cost += Math.round(clicker.upgrades[thing].cost * 0.15);
      update_upgrades();
    }
  }
};
delay = 0;
function update_upgrades() {
  document.querySelector("#upgrades").innerHTML = "";
  for (i in clicker.upgrades) {
    document.querySelector("#upgrades").innerHTML += `<br> <button style="color: #ffffff" onclick="pickle_clicked('${i}')">${clicker.upgrades[i].name}</button> <br>You have ${clicker.upgrades[i].amount} | Cost: ${clicker.upgrades[i].cost}<br>`;
  }
}
function updatecount() {
  update_upgrades();
  if (Cookies.get("clicker") != null && Cookies.get("clicker") != "undefined") {
    var clicker1 = JSON.parse(Cookies.get("clicker"));
    for (i in clicker.upgrades) {
      if (clicker1.upgrades[i] == null) {
        clicker1.upgrades[i] = clicker.upgrades[i];
      }
    }
    clicker = clicker1;
  }
  setInterval(() => {
    for (i in clicker.achievements) {
      var x = new Function('return ' + clicker.achievements[i].req);
      if (x() && !clicker.achievements[i].gotten) {
        clicker.achievements[i].gotten = true;
        document.querySelector("#achievements").innerHTML += `<br>ACHIEVEMENT UNLOCKED:<br>${clicker.achievements[i].title}<br>${clicker.achievements[i].text}<br>`;
      }
    }
    for (i in clicker.upgrades) {
      clicker.pickles += clicker.upgrades[i].amount * clicker.upgrades[i].gps / 20;
    }
    document.querySelector("#pickles").innerHTML = "You have " + String(clicker.pickles).split(".")[0] + " Pickles";
    delay++;
  }, 50);

    document.querySelector("#avg_pickle").innerHTML = clicker.avg + " Pickles Per Second";
  
}


function saveGame() {
  Cookies.set("clicker", JSON.stringify(clicker), { expires: 100000 });
}

function resetGame() {
clicker.pickles = 0;
clicker.avg = 0;
saveGame()
console.log("G");
}