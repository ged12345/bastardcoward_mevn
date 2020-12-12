<template>
  <div class="typewriter">
    <h1 id="console" class="typewriter_default"></h1>
  </div>
</template>

<script>
import LocationsService from '@/services/LocationsService'
import ActionsService from '@/services/ActionsService'
import PlayerService from '@/services/PlayerService'
import MonstersService from '@/services/MonstersService'
import DamageTypesService from '@/services/DamageTypesService'
import checkResponseAndReturnValue from '../assets/js/networkResponse'
import DisplayText from '../assets/js/displayText'
import GameQueue from '../assets/js/gameQueue'

export default {
  name: 'ViewGame',
  data () {
    return {
      currentLocationID: this.$route.params.id,
      gameQueue: new GameQueue(),
      gameQueueLocked: false,
      heartbeatInterval: 0,
      levelString: '',
      actions: [],
      monsters: [],
      player: null,
      startBattle: false
    }
  },
  methods: {
    clearRoom: function () {
      // Reset room variables - seperate function
      this.monsters = []
      this.actions = []
    },
    addRunActionVanillaJSToDOM: function (locationNum) {
      // Create the element
      var script = document.createElement('script')
      // Add script content
      script.innerHTML =
        "function runAction(locationNum) { console.error(locationNum); window.location = '/' + locationNum; }"
      // Append
      document.head.appendChild(script)
    },
    startHeartbeat: function () {
      // Heartbeat every half-second so we don't take up all the resources.
      this.heartbeatInterval = setInterval(() => {
        if (this.gameQueueLocked === false) {
          if (this.gameQueue.front()) {
            this.gameQueue.front()()
          }
        }
      }, 1000)
    },
    addToGameQueue: function (nextHeartbeatEl) {
      this.gameQueue.enqueue(() => {
        this.gameQueueLocked = true
        nextHeartbeatEl()
        this.gameQueue.dequeue()
        this.gameQueueLocked = false
      })
    },
    displayGameText: function (textToDisplay, callback) {
      let screenInterval = setInterval(() => {
        if (!DisplayText.display(textToDisplay, callback)) {
          clearInterval(screenInterval)
          this.levelString = ''
        }
      }, 2)
    },
    addGameText: function (textToDisplay) {
      this.levelString += textToDisplay
    },
    addGameTextLine: function (textLineToDisplay) {
      this.levelString += (textLineToDisplay + '<br>')
    },
    showGameText: function () {
      this.addToGameQueue(() => { this.displayGameText(this.levelString) })
    },
    doBattleRound: function () {
      this.addToGameQueue(() => {
        // If we havent finished battle, we run another battle round
        this.showGameText()
        if (this.doBattleAction()) {
          // Add prompts for this battle?
          this.doBattleRound()
        }
      })
    },
    initPlayer: async function () {
      const player = await PlayerService.getPlayer()

      // No response to room location request
      if (player.data.game_data.length !== 0) {
        this.player = player.data.game_data
      }
    },
    updatePlayer: async function () {
      await PlayerService.updatePlayer({
        name: this.player.name,
        health: this.player.health,
        max_health: this.player.max_health,
        chaos: this.player.chaos,
        max_chaos: this.player.max_chaos,
        chaos_spec: this.player.chaos_spec,
        brawl: this.player.brawl,
        assassinate: this.player.assassinate,
        fighting_spec: this.player.fighting_spec,
        fate: this.player.fate,
        exp: this.player.exp
      })
    },
    parseDiceRolls: function (diceRollString) {
      let rollTotal = 0
      let diceRollsArr = String(diceRollString).split(' + ')

      diceRollsArr.forEach((roll) => {
        if (roll.indexOf('d') !== -1) {
          let diceRoll = 0
          let multiplier = parseInt(roll[0], 10)
          if (isNaN(multiplier)) {
            diceRoll = Math.ceil(Math.random() * roll[1])
            rollTotal += parseInt(diceRoll, 10)
          } else {
            diceRoll = Math.ceil(Math.random() * roll[2])
            rollTotal += parseInt(multiplier * diceRoll, 10)
          }
        } else {
          // Always parse in case of string
          rollTotal += parseInt(roll, 10)
        }
      })
      // Ensure we return an Int
      return parseInt(rollTotal, 10)
    },
    getMonsterDamageTypes: async function (monster) {
      let damageRollStringArr = []

      /* monster.damage_types.forEach(async (damageTypeName) => {
        const damageType = await checkResponseAndReturnValue(await DamageTypesService.findDamageType(damageTypeName.trim()))

        if (damageType !== null) {
          damageRollStringArr.push(damageType.damage)
        }
      }) */

      const promises = monster.damage_types.map(async (damageTypeName) => {
        const damageType = await checkResponseAndReturnValue(await DamageTypesService.findDamageType(damageTypeName.trim()))
        if (damageType !== null) {
          damageRollStringArr.push(damageType.damage)
        }
      })
      await Promise.all(promises)
      // damageRollStringArr.forEach(el => console.log(el))

      // Was returning an empty array[] with objects inside?
      return Array(damageRollStringArr)
    },
    doBattleAction: async function () {
      if (this.monsters.length !== 0 || this.player.health <= 0) {
      // Do battle with the monsters. We'll write a basic version here but farm out all this action logic later.abs

        if (this.startBattle === false) {
          // Find monster archetype
          let monsterArr = []

          let promises = this.monsters.map(async (monster) => {
            monsterArr.push(await checkResponseAndReturnValue(await MonstersService.findMonster(monster)))
          })

          await Promise.all(promises)

          // Replace monster name array with actual array from API
          this.monsters = monsterArr
          this.startBattle = true

          console.log('Starting Battle...')
          this.addGameTextLine('Starting Battle...')
          console.log('Beginning Player health: ' + this.player.health)
          this.addGameTextLine('Beginning Player health: ' + this.player.health)
          console.log('Beginning Monsters health:')
          this.addGameTextLine('Beginning Monsters health:')
          this.monsters.forEach((monster) => {
            console.log(monster.name + ': ' + monster.health)
            this.addGameTextLine(monster.name + ': ' + monster.health)
          })
          // Keep origial health so we can add it to player exp
          this.monsters.map((monster) => ({...monster, 'original_health': monster.health}))
          console.log('\n\n')
        }

        if (this.player.health > 0 && this.monsters.some(monster => monster.health > 0)) {
          let monsterDiceRolls = []

          this.addGameTextLine('<br>Starting Round')
          console.log('Starting Round...')

          let promises = this.monsters.map(async (monster) => {
            monsterDiceRolls.push(await this.getMonsterDamageTypes(monster))
          })

          await Promise.all(promises)

          // Initialise monster roll total arrayarray
          let monsterRollTotal = []
          this.monsters.forEach(async (monster) => {
            monsterRollTotal.push(0)
          })

          // Let the monster attack
          let monsterIndex = 0
          monsterDiceRolls.forEach((diceRoll) => {
            this.addGameTextLine(`${this.monsters[monsterIndex].name} Roll: ${diceRoll}`)
            console.log(`${this.monsters[monsterIndex].name} Roll: ${diceRoll}`)

            monsterRollTotal[monsterIndex] += this.parseDiceRolls(diceRoll)
            this.player.health -= monsterRollTotal[monsterIndex]

            monsterIndex++
          })

          monsterIndex = 0
          this.monsters.forEach(async (monster) => {
            this.addGameTextLine(`${monster.name} Total Damage: ${monsterRollTotal[monsterIndex]}`)
            console.log(`${monster.name} Total Damage: ${monsterRollTotal[monsterIndex]}`)

            monsterIndex++
          })

          monsterIndex = 0
          this.monsters.forEach(async (monster) => {
            // Will need to build a statemachine for physical damage and magic damage/effects and objects usage
            // We work this out later from level/stats - Skill/Strength? Or from Assination/Brawling?
            let playerDiceRoll = '3d3 + 1'

            this.addGameTextLine(`Player Roll: ${playerDiceRoll}`)
            console.log(`Player Roll: ${playerDiceRoll}`)
            let playerRollTotal = this.parseDiceRolls(playerDiceRoll)
            this.addGameTextLine(`Player Total Damage -> ${monster.name}: ${playerRollTotal}`)
            console.log(`Player Total Damage -> ${monster.name}: ${playerRollTotal}`)

            monster.health -= playerRollTotal

            monsterIndex++
          })

          // Note: Do we add dodge or armour scores? We're an assassin so we would have chance to dodge/parry. What about the opponent? Based on skill level with weapon/armour? KISS )Keep It Simple Stupid).
          // Create player object
          // Travelling creatures and weather events (which impact magic).
          // Possible sun/moon daytime and nighttime - assassination works better during the night but daytime means less destructive monsters after you?
          // Create ability for player to use magic and some limited monsters magic usage
          // Create ability to perm maim/curse a monster
          // Create ability to get maimed (with slow auto-regeneration but hurts for the one battle)
          // Create ability to pickup items and store
          // Create ability to generate stored event we can check later
          // Do some luck tests etc.

          // Pop any monsters off the array whose health is 0 or less.
          this.monsters.map(async (monster) => {
            let monsterIndex = this.monsters.indexOf(monster)

            if (monster.health < 1 && monsterIndex > -1) {
              console.log(`-----------\n`)
              console.log(`You killed ${monster.name}!\n`)
              console.log(`-----------\n\n`)

              this.addGameTextLine(`You killed ${monster.name}!\n`)

              // Once the player kills a monster, pass along the experience (we will later upgrade their chosen specialties based on this exp)
              this.player.exp = this.player.exp + this.monsters[monsterIndex].original_health

              this.monsters.splice(monsterIndex, 1)
            }
          })

          this.addGameTextLine('\nEnd of Round')
          this.addGameTextLine('Player health: ' + this.player.health)
          this.addGameTextLine('Monsters health:')

          console.log('\nEnd of Round')
          console.log('Player health: ' + this.player.health)
          console.log('Monsters health:')
          this.monsters.forEach((monster) => {
            console.log(monster.name + ': ' + monster.health)
            this.addGameTextLine(monster.name + ': ' + monster.health)
          })
          console.log('\n\n')

          this.updatePlayer()

          return true
        }
      } else {
        if (this.monsters.length === 0) {
          console.log('YOU WON THE BATTLE!')
          this.addGameTextLine('YOU WON THE BATTLE!')
        } else {
          console.log("YOU'RE DEAD, NOBLE WARRIOR.")
          this.addGameTextLine("YOU'RE DEAD, NOBLE WARRIOR.")
        }
        // Here we do battle cleanup
        this.monsters = []

        return false
      }
    }
  },
  async mounted () {
    // Add vanilla JS functions
    this.addRunActionVanillaJSToDOM()
    this.clearRoom()
    this.initPlayer()

    if (this.$route.params.id === undefined) {
      this.currentLocationID = 1
    }

    const log = document.getElementById('console')
    // Need this to set where text appears on screen
    DisplayText.setDisplayElement(log)
    document.addEventListener('keyup', logKey)

    function logKey (e) {
      if (`${e.key}` === 'Enter') log.innerHTML += '<br />'
      else if (`${e.key}` === 'Backspace') {
        var newStr = log.innerHTML.split('') // or newStr = [...str];
        newStr.splice(newStr.length - 1, 1)
        newStr = newStr.join('')
        log.innerHTML = newStr
      } else if (
        `${e.key}` !== 'Shift' &&
        `${e.key}` !== 'Control' &&
        `${e.key}` !== 'Alt'
      ) { log.innerHTML += `${e.key}` }
    }

    // THERE IS A JAVASCRIPT LIBRARY DOES THE PRINTING FOR US!!!!
    // Investigate: https://mntn-dev.github.io/t.js/
    // Fetch the location information including the actions
    const locationResponse = await LocationsService.findLocation(
      this.currentLocationID
    )

    // No response to room location request
    if (locationResponse.data.game_data.length === 0) return

    // Then we request every action to do with this room, and after the first pass where we set the description, we replace each number with whatever special symbol we decide on with a link to the action and a generic function that will run our actions for us. May even add a field in action to link to another action (one after another so we can chain them together).

    this.actions = await checkResponseAndReturnValue(await ActionsService.getActionsForLocationID({
      location_id: this.currentLocationID
    }), 0, 'end')

    // Important: Every room contains an action of some sort!!
    if (this.actions === null) return

    // There will also eventually be monsters, and when that happens we'll go to another screen and then come back once the battle is over.
    this.levelString = `<br><strong>${locationResponse.data.game_data[0].title}</strong><br><br>${locationResponse.data.game_data[0].description}<br><br>`

    this.actions.forEach(action => {
      // We currently only show locations, not other actions (like a character action - picking up an object etc.)
      // Note: I don't think we need location_num - this specifies the order (number) next to each location item, we could just have an index?
      // But what about if we want an action (Pull suspicious rock) and want to intersperse with locations and others - maybe keep but ignore if it doesn't exist (just go through actions willynilly?)
      // Also, how do we refence an action? A combination of location is and location num? Or do we have a seperate Action Id field?
      // Also, if detects a particular action (AUTO_BATTLE), maybe metafields then gives ua a selection of monsters?
      // Combine monsters into one AUTO_BATTLE call (metadata, comma-seperated?
      if (action.type === 'LOC') {
        this.levelString += `<a href="#" onclick="runAction(${action.metadata}); return false;">${action.location_num}. ${action.description}</a><br>`
      } else if (action.type === 'AUTO_BATTLE') {
        // Monster names are in metadata
        action.metadata.split(',').forEach((monsterName) => {
          this.monsters.push(monsterName.trim())
        })
      }
    })

    // If we have a battle as soon as we enter the location, we should start the battle or event - will have to work out how we partition out this code and indicate a pasue is needed before the next event. Event manager stack?

    // Add space after options
    this.levelString += '<br><br>'

    this.showGameText()
    this.doBattleRound()

    // Start game queue/heartbeat interval that will run while we're on this page
    this.startHeartbeat()
  }
}
</script>
<style>
#logo {
  display: inline !important;
  height: 5%;
  width: 5%;
  margin-top: -50px;
}

.typewriter {
  position: unset !important;
  top: 0%;
  left: 0%;
  transform: unset !important;
}

a {
  color: black;
  font-weight: 800;
}

a:link {
  text-decoration: none;
}

a:visited {
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

a:active {
  text-decoration: underline;
}
</style>
