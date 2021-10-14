<template>
  <!-- // vue-virtualized-list -->
  <main class="flex items-center w-full min-h-screen bg-gray-100">
    <section class="w-full max-w-3xl p-5 mx-auto bg-white rounded-md ">
      <!-- search section -->
      <div class="py-2">
        <SearchBar v-model.lazy="search" />
      </div>

      <!-- users section -->
      <RecycleScroller
        class="max-h-[85vh] py-1 pr-2"
        :items="usersToShow"
        :item-size="170"
        key-field="email"
      >
        <template v-slot="{ item, index }">
          <transition-group name="slide-fade" appear>
            <SingleUser
              :key="index"
              :user="item"
              :searchText="search"
              @switchSelect="switchSelect"
            />
          </transition-group>
        </template>
      </RecycleScroller>
    </section>
  </main>
</template>

<script>
import { RecycleScroller } from "vue-virtual-scroller";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";

export default {
  name: "HomePage",
  components: { RecycleScroller },
  data() {
    return {
      search: "",
      allUsers: []
    };
  },
  async fetch() {
    await this.getData();
  },
  methods: {
    switchSelect(user) {
      const index = this.allUsers.indexOf(user);
      const newUser = { ...user };

      // Select
      if (user.selected) {
        newUser.selected = false;
        this.allUsers.splice(index, 1, newUser);
      } else {
        // Deselect
        newUser.selected = true;
        this.allUsers.splice(index, 1, newUser);
      }
    },
    getData() {
      return this.$axios.get("/search/Boris?").then(res => {
        this.allUsers = res.data;
      });
    }
  },

  computed: {
    usersToShow() {
      if (!this.allUsers.length) {
        return [];
      }
      const userArr = Object.freeze([...this.allUsers]);

      return userArr.filter(el => {
        return el.name.toLowerCase().includes(this.search);
      });
    }
  }
};
</script>
