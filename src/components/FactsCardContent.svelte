<script>
    export let facts = null;

    let shuffledFacts = [];
    let currentFacts = [];

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
        if (facts && facts.length > 0) {
            shuffleArray(facts);
            shuffledFacts = [...facts];
            currentFacts = shuffledFacts.splice(0, 3); // Set the first 3 facts
        }
    });
</script>

{#if facts === null}
    <p class="my-2 text-sm text-gray-500">
        This card is unavailable right now, try again later.
    </p>
{:else}
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
{/if}
