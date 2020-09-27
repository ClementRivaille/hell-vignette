<template>
  <ui-screen>
    <div class="questions">
      <transition name="screen-fade" mode="out-in">
        <div class="asking" v-if="!selected">
          <ui-paragraph>
            {{ $t(`question.intro.${level}`) }}
          </ui-paragraph>
          <ul class="list">
            <li v-for="question in questions" :key="question">
              <question-link @click="choose(question)">{{
                $t(`question.${question}.title`)
              }}</question-link>
            </li>
          </ul>
        </div>

        <div class="answering" v-else>
          <ui-paragraph class="answer">
            <p>{{ $t(`question.${selected}.answer`) }}</p>
            <p>{{ $t(`question.exit.${level}`) }}</p>
          </ui-paragraph>
          <button-link class="back-link" @click="$emit('leave', selected)">{{
            $t("question.back")
          }}</button-link>
        </div>
      </transition>
    </div>
  </ui-screen>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import UiParagraph from "@/components/ui/ui-paragraph.vue";
import ButtonLink from "@/components/ui/button-link.vue";
import QuestionLink from "@/components/ui/question-link.vue";
import UiScreen from "@/components/ui/ui-screen.vue";

export default defineComponent({
  name: "screen-questions",
  props: {
    level: {
      type: Number,
      required: true,
    },
    questions: {
      type: Array as () => string[],
      required: true,
    },
  },
  emits: ["leave"],
  setup() {
    const selected = ref<string | undefined>();
    const choose = (question: string) => {
      selected.value = question;
    };

    return { selected, choose };
  },
  components: { UiParagraph, ButtonLink, QuestionLink, UiScreen },
});
</script>

<style scoped>
.questions {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.asking > * + * {
  margin-top: 3rem;
}

.list {
  list-style: none;
  font-style: italic;
  font-weight: bold;
  background: rgba(255, 255, 255, 0.3);
  padding: 1rem;
  border-radius: 20px;
}
.list > * + * {
  margin-top: 0.7rem;
}

.answering {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.answer {
  width: 100%;
  margin-bottom: 3rem;
}

.back-link {
  font-family: ataristocrat;
  font-size: 1.3rem;
  text-transform: uppercase;
}
</style>
