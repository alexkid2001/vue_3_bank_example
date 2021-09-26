<template>
  <app-page back title="Help">
    <question-item
        v-for="q in questions"
        :key="q.title"
        :question="q"/>
  </app-page>
</template>

<script>
import AppPage from '../components/ui/AppPage'
import QuestionItem from '../components/question/QuestionItem';

export default {
  name: "Help",

  setup () {
    const questions = [
      {title: 'What we have in this system?', text: 'There are we have all fo look, what request we have'},
      {title: 'How authorisation work?', text: 'All work by FireBase'}
    ]
    return {
      questions
    }
  },

  components: {
    AppPage,
    QuestionItem
  }
}
</script>

<style scoped>

</style>