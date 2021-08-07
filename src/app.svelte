<script>
	import { onMount } from 'svelte';
    
    let ready = false;

    onMount(() => ready = true);

    let visible = false;
	function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
    }
	
	function typewriter(node, { speed = 50 }) {
		const valid = (
			node.childNodes.length === 1 &&
			node.childNodes[0].nodeType === Node.TEXT_NODE
		);
		if (!valid) {
			throw new Error(`This transition only works on elements with a single text node child`);
		}
	
		let random = (Math.random() * (150 - 50) + 50)/100;
		let pre = Math.floor(Math.random() * (5-1) + 1);
		//console.log(random)
		const text = node.textContent;
		const duration = text.length * speed * random;
		let ending = 0;
		let indexToStop = text.length - pre;
		console.log(pre);
		return {
			duration,
			tick: t => {
				//Once we are getting to the last few characters, make the makeid shorter
				const i = ~~(text.length * t);
				if(i > indexToStop){
					ending = i - indexToStop;
				}
				node.textContent = text.slice(0, i) + makeid(pre-ending);
			}
		};
	}
</script>


<label>
	<input type="checkbox" bind:checked={visible}>
	visible
</label>

<div class="always-visible">
    {#if ready}
        <p in:typewriter>
            The quick brown fox jumps over the lazy dog
        </p>
    {/if}
</div>