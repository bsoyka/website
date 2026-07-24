<script>
    let facts = null;
    let loading = true;

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
        currentFacts = shuffledFacts.splice(0, 3);
    }

    import { onMount } from "svelte";

    onMount(async () => {
        try {
            const response = await fetch(
                "https://statistician.bensoyka.com/public/facts",
            );

            if (response.ok) {
                const data = await response.json();
                facts = data.facts;

                if (facts && facts.length > 0) {
                    shuffleArray(facts);
                    shuffledFacts = [...facts];
                    currentFacts = shuffledFacts.splice(0, 3);
                }
            } else {
                console.warn("Failed to fetch facts: non-OK response.");
            }
        } catch (e) {
            console.warn("Failed to fetch facts:", e);
        } finally {
            loading = false;
        }
    });
</script>

{#if loading}
    <p class="my-2 text-sm text-gray-500">Loading...</p>
{:else if facts === null}
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
        <div
            class="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-2 gap-2"
        >
            <button class="btn-primary" on:click={generateNewFacts}
                >Generate New Facts</button
            >
            <p class="text-sm">
                Yes, the facts with stats are up-to-date. <a
                    href="https://gh.bsoyka.me/statistician">See how.</a
                >
            </p>
        </div>
    </div>
{/if}
