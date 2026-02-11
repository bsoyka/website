<script>
    export let facts = [];

    let shuffledFacts = [];
    let currentFacts = ["No facts available."];

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function generateNewFacts() {
        if (shuffledFacts.length < 3) {
            shuffleArray(facts);
            shuffledFacts = [...facts];
        }
        currentFacts = shuffledFacts.splice(0, 3); // Get the next 3 facts
    }

    import { onMount } from "svelte";

    onMount(() => {
        if (facts.length > 0) {
            shuffleArray(facts);
            shuffledFacts = [...facts];
            currentFacts = shuffledFacts.splice(0, 3); // Set the first 3 facts
        }
    });
</script>

<div>
    <ul class="my-2" id="facts">
        {#each currentFacts as fact}
            <li class="max-w p-2 border border-gray-200 rounded-lg">
                {@html fact}
            </li>
        {/each}
    </ul>
    <button class="btn-primary" on:click={generateNewFacts}
        >Generate New Facts</button
    >
</div>
