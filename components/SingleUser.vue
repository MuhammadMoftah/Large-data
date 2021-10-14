<template>
  <article
    class="w-full bg-[#FAFAFA] border-gray-300 shadow-md rounded-md h-[150px]  flex  overflow-hidden"
    :class="user.selected ? 'border-blue-600 border' : 'border-transparent '"
  >
    <img
      :src="user.avatar"
      class="object-contain w-1/3 h-full bg-gray-300"
      alt="avatar"
    />

    <div class="flex flex-col w-full">
      <div class="w-full p-3 pl-8">
        <hgroup class="flex items-center justify-between">
          <p class="text-xl" v-html="highlight(user.name)"></p>
          <p class="text-xs text-gray-600" v-html="highlight(user.email)"></p>
        </hgroup>

        <div class="py-1">
          <p
            class="py-1 text-sm font-bold text-gray-600"
            v-html="highlight(user.title)"
          ></p>
          <p class="text-sm text-gray-500" v-html="highlight(user.address)"></p>
        </div>
      </div>

      <button
        v-if="!user.selected"
        @click="$emit('switchSelect', user)"
        class="h-full pl-8 text-sm font-semibold text-left text-teal-600 uppercase transition-all duration-300 ease-in-out border-t hover:bg-teal-100 hover:pl-10"
      >
        Mark as Suitable
      </button>

      <button
        v-else
        @click="$emit('switchSelect', user)"
        class="h-full pl-8 text-sm font-semibold text-left text-teal-600 uppercase transition-all duration-300 ease-in-out hover:bg-teal-100 hover:pl-10"
      >
        Skip Selection
      </button>
    </div>
  </article>
</template>

<script>
export default {
  props: ["user", "searchText"],

  methods: {
    highlight(text) {
      if (!this.searchText) {
        return text;
      }
      return text.replace(new RegExp(this.searchText, "gi"), match => {
        return '<span class="bg-[#FFF73B]">' + match + "</span>";
      });
    }
  }
};
</script>

<style></style>
