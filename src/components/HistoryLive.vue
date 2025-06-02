<template>
  <div class="history" v-if="history.length">
    <h2>Translation History</h2>
    <ul>
      <li v-for="(item, index) in history" :key="index">
        <span class="from">{{ item.from }}:</span>
        <span class="source">{{ item.source }}</span> →
        <span class="to">{{ item.to }}:</span>
        <span class="translation">{{ item.translation }}</span>
      </li>
    </ul>
    <button class="clear-btn" @click="$emit('clear-history')">Clear History</button>
  </div>
  <div v-else class="no-history">No translation history yet.</div>
</template>

<script>
export default {
  props: {
    history: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.history {
  margin-top: 40px;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.15);
  border-radius: 15px;
  max-width: 700px;
  width: 100%;
  text-align: left;
  color: #fff;
}

.history h2 {
  margin-bottom: 15px;
  font-size: 1.4rem;
  text-decoration: underline;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
  font-size: 1.2rem;
}

.from {
  font-weight: bold;
  color: #ffd700;
  margin-right: 4px;
}

.source {
  margin-right: 10px;
}

.to {
  font-weight: bold;
  color: #7fffd4;
  margin-left: 8px;
  margin-right: 4px;
}

.translation {
  font-style: italic;
}

.clear-btn {
  margin-top: 15px;
  padding: 8px 15px;
  border: none;
  background: #ff6b6b;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
}

.clear-btn:hover {
  background: #ff4d4d;
}

.no-history {
  margin-top: 40px;
  color: #ccc;
  font-style: italic;
  text-align: center;
}
</style>
