import { onMounted } from "vue";
import anime from "animejs/lib/anime.es.js";

const initTransitions = () => {
  onMounted(() => {
    anime({
      targets: ".fade-in",
      opacity: 1,
      delay: anime.stagger(100),
    });
  });
};

export { initTransitions };
