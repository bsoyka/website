<script>
    export let facts = [];

    let shuffledFacts = [];
    let currentFact = "No facts available."; // Default fallback

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function generateNewFact() {
        if (shuffledFacts.length === 0) {
            shuffleArray(facts);
            shuffledFacts = [...facts];
        }
        currentFact = shuffledFacts.pop(); // Get the next fact
    }

    import {onMount} from "svelte";

    onMount(() => {
        console.log("Received facts:", facts); // Debugging
        if (facts.length > 0) {
            shuffleArray(facts);
            shuffledFacts = [...facts];
            currentFact = shuffledFacts.pop(); // Set the first fact
        }
    });
</script>

<div>
    <p>{currentFact}</p>
    <button on:click={generateNewFact}>Generate New Fact</button>
</div>