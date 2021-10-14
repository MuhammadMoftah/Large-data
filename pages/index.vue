<template>
  <!-- // vue-virtualized-list -->
  <main class="flex items-center w-full min-h-screen bg-gray-100">
    <section class="w-full max-w-3xl p-5 mx-auto bg-white rounded-md ">
      <!-- search section -->
      <div class="py-2">
        <SearchBar v-model.lazy="search" />
      </div>

      <!-- loading section -->
      <section
        class="flex items-center justify-center w-full p-5 text-gray-500"
        v-if="!allUsers.length"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6 mx-2 animate-spin "
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"
          />
          <path
            fill-rule="evenodd"
            d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
          />
        </svg>
        loading
      </section>
      <!-- users section -->
      <RecycleScroller
        v-else
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
  mounted() {
    this.getData();
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
      fetch("/search/Boris")
        .then(response => response.json())
        .then(json => {
          this.allUsers = json;
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
        return el.name.toLowerCase().includes(this.search.toLowerCase());
      });
    }
  }
};
</script>
