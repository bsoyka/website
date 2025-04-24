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

    import {onMount} from "svelte";

    onMount(() => {
        if (facts.length > 0) {
            shuffleArray(facts);
            shuffledFacts = [...facts];
            currentFacts = shuffledFacts.splice(0, 3); // Set the first 3 facts
        }
    });
</script>

<div>
    <ul>
        {#each currentFacts as fact}
            <li>{fact}</li>
        {/each}
    </ul>
    <button on:click={generateNewFacts}>Generate New Facts</button>
</div>