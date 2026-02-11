<script>
    import { onMount } from "svelte";
    import { animate } from "motion";

    const animateCards = (containerId) => {
        const cardsContainer = document.querySelector(`#${containerId}`);
        if (cardsContainer) {
            const cards = Array.from(cardsContainer.children);
            cards.forEach((card, index) => {
                animate(
                    card,
                    {
                        opacity: [0, 1],
                        transform: ["translateY(20px)", "translateY(0)"],
                    },
                    {
                        duration: 0.5,
                        delay: index * 0.1,
                    },
                );
            });
        }
    };

    onMount(() => {
        const containers = document.querySelectorAll("[data-animate-cards]");
        containers.forEach((container) => {
            animateCards(container.id);
        });
    });
</script>
