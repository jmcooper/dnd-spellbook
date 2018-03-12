<template>
  <div class="spellbooks-hero">
    <input type="text" class="book-name" name="book-name" v-model="spellbook.name" placeholder="Spellbook Name" />
    <button class="button save" @click="save()">Save Spellbook</button>
    <div>
      <select class="class-type" v-model="spellbook.classType">
        <option value="">Select class</option>
        <option value="bard">Bard</option>
        <option value="cleric">Cleric</option>
        <option value="druid">Druid</option>
        <option value="paladin">Paladin</option>
        <option value="ranger">Ranger</option>
        <option value="sorcerer">Sorcerer</option>
        <option value="warlock">Warlock</option>
        <option value="wizard">Wizard</option>
      </select>
    </div>
    <div class="spells">
      <div>
        <h2>Spells</h2>
        <table class="spell-table">
          <thead>
            <th class="remove-column">
            </th>
            <th>Name</th>
            <th>Level</th>
          </thead>
          <tbody>
            <tr v-for="spell in spellbook.spells" :key="spell.name">
              <td class="remove-column">
                <button class="button remove-button" @click="removeSpell(spell)">-</button>
              </td>
              <td>{{spell.name}}</td>
              <td>{{spell.level}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <h2>Search Spells</h2>
        <div v-if="spellbook.classType === 'wizard'">
          <input type="checkbox" v-model="searchWizardOnlySpells" true-value="true" false-value="" class="wizard-only-checkbox"/>
          <label for="searchWizardOnlySpells">Show wizard spells only</label>
        </div>
        <table class="spell-table">
          <thead>
            <th class="add-column"></th>
            <th>Name</th>
            <th>Level</th>
          </thead>
          <tbody>
            <tr class="filters">
              <td class="add-column"></td>
              <td>        
                <input v-model="filters.name" placeholder="filter"/>
              </td>
              <td><input v-model="filters.level" placeholder="filter"/></td>
            </tr>
            <tr v-for="spell in spells" :key="spell.name">
              <td class="add-column">
                <button class="button add-button" @click="addSpell(spell)">+</button>
              </td>
              <td>{{spell.name}}</td>
              <td>{{spell.level}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
const data = {
  filters: {name: null, level: null,},
  localSpellbook: {classType: null},
  searchWizardOnlySpells: true
}
export default {
  name: 'EditSpellbook',
  data: function() { return data },
  computed: {
    user() {
      return this.$store.state.user
    },
    spells() {
      if (!this.$store.state.spells.filter) return []

      const filters = this.filters
      return this.$store.state.spells.filter(spell => 
        (!filters.name || spell.name.toLowerCase().includes(filters.name.toLowerCase())) &&
        (!filters.level || spell.level.toString().startsWith(filters.level)) &&
        (!this.spellbook.classType || !!this.spellbook.classType === 'wizard' || spell.classes.includes(this.spellbook.classType)) &&
        (!this.searchWizardOnlySpells || spell.classes.includes('wizard'))
      )
    },
    spellbook() {
      const spellbook = this.$store.state.user.spellbooks.find(sb => sb.id === this.$route.params.id)
      this.localSpellbook = spellbook ? Object.assign({}, spellbook) : {name: '', spells: [], classType: null}
      return this.localSpellbook
    }
  },
  methods: {
    save: function() {
      this.$store.dispatch('upsertSpellbook', this.spellbook)
        .then(spellbookId => this.$router.push(`/edit-spellbook/${spellbookId}`))
    },
    addSpell: function(spell) {
      this.spellbook.spells.push(spell)
    },
    removeSpell: function(spell) {
      const index = this.spellbook.spells.findIndex(sp => sp.name === spell.name)
      if (index > -1)
        this.spellbook.spells.splice(index, 1)
    }
  },
  mounted: function() {
    this.$store.dispatch('getSpells')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .spellbooks-hero {
    background: linear-gradient(rgba(0,0,0, .5), rgba(0,0,0, 1) 1500px), url('./background.jpg') no-repeat 0 0;
    background-size: 1920px;
    min-height: 1200px;
    padding: 50px;
    text-align: left;
    color: #3589A1;
    
  }
  .book-name { 
    font-size: 25px;
    padding: 10px;
    width: 300px;
  }
  .class-type {
    margin-top: 10px;
    font-size: 25px;
    padding: 10px;
    width: 323px;
  }
  ::placeholder {
    color: #ddd;
    opacity: 1;
  }
  .spells {
    display: flex;
    justify-content: space-between;
    width: 1200px;
  }
  .wizard-only-checkbox {
    width:40px;
    padding: 0;
    font-size:25px;
    margin-right: 0;
    margin-left: -12px;
  }
  .spell-table {
    color: #3589A1;
    font-size: 18px;
    th:first-child, td:first-child {
      padding-left: 0;
    }
    th, td {
      padding: 3px 20px;
    }
    .add-column, .remove-column {
      padding-right: 0;
      text-align: center;
    } 
  }
  .add-button, .remove-button {
    font-size: 18px;
    padding: 1px 6px;
    cursor: pointer;
  }
  .remove-button {
    padding: 1px 7px;
  }
  .save {
    margin-left: 20px;
    font-size: 25px;
    padding: 12px;
    cursor: pointer;
  }
  h2 {
    margin-top: 30px;
    margin-bottom: 10px;
  }
  .filters {
    td {
      input {
        background-color: #3589A1;
        color: white;
        font-size: 16px;
        border-color:#000;
        padding:3px;
        width: 100%;
      }
      ::placeholder {
        color: #156981;
        opacity: 1;
      }
    }
  }
</style>
