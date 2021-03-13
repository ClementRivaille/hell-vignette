<template>
  <ui-screen color="#2e2e2e">
    <div class="start">
      <div>
        <h1>{{ $t('start.title') }}</h1>
        <div class="menu">
          <a href="#" @click.prevent="begin(false)">{{ $t('start.begin') }}</a>
          <a v-if="resume" href="#" @click.prevent="begin(true)">{{
            $t('start.continue')
          }}</a>
        </div>
      </div>
      <hv-options
        :no-input="noInput"
        @toggle-no-input="$emit('toggle-no-input')"
      />
      <ui-info>
        {{ $t('start.save') }}
      </ui-info>
    </div>
  </ui-screen>
</template>

<script lang="ts">
import UiScreen from '@/components/ui/ui-screen.vue';
import { defineComponent } from 'vue';
import HvOptions from '../hv-options.vue';
import UiInfo from '../ui/ui-info.vue';

export default defineComponent({
  name: 'screen-start',
  components: { UiScreen, HvOptions, UiInfo },
  props: {
    resume: {
      type: Boolean,
    },
    noInput: Boolean,
  },
  emits: {
    begin: (payload: boolean) => true,
    'toggle-no-input': null,
  },
  setup(_props, context) {
    return {
      begin(resume: boolean) {
        context.emit('begin', resume);
      },
    };
  },
});
</script>

<style scoped>
.start {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

h1 {
  font-size: 4.3rem;
  text-align: center;
  font-family: bpreplay;
  letter-spacing: 10px;
  margin: 0 0 3rem 0;
}

.menu {
  display: flex;
  justify-content: center;
}
.menu > * + * {
  margin-left: 2rem;
}

a {
  color: inherit;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  border: solid lightgrey 2px;
  padding: 0.5em 0.8em;
  border-radius: 15px;
}
a:hover,
a:focus {
  outline: none;
  color: #d1df92;
  border-color: #d1df92;
  box-shadow: #d1df92 0 0 0 2px;
}
</style>
