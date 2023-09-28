<template>
  <a-popover :title="name">
    <a :href="href"><code style="cursor: pointer;">{{ name }}</code></a>
    <template #content>
      <div class="">{{ intro }}</div>
    </template>
  </a-popover>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ""
    },
    intro: {
      type: String,
      default: ""
    },
    link: {
      type: String,
      default: ""
    }
  },
}

</script>