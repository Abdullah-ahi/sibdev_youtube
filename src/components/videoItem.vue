<template>
  <div class="video-item">
    <iframe :src="`https://www.youtube.com/embed/${video.actualId}`" frameborder="0" allow="autoplay" allowfullscreen></iframe>
    <div class="video-info">
      <div>{{video.snippet.title.slice(...sliceRules)}}</div>
      <div>{{video.snippet.description.slice(...sliceRules)}}</div>
      <span>{{video.snippet.channelTitle}}</span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'VideoItem',
  props: {
    sliceRules: { type: Array, required: true },
    video: { type: Object, required: true }
  }
}
</script>
