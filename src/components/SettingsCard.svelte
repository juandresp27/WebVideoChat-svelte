<script>
	import { onMount } from 'svelte';
    //export let Microphones
    //export let VideoDevices
    //export let SpeakerDevices

    import { devicesSelected } from '../stores'

    let Microphones = []
    let VideoDevices = []
    let SpeakerDevices = []

    let microSelected
    let videoSelected
    let speakerSelected

    onMount(async()=>{
        try {
            if(navigator.mediaDevices.getUserMedia) {
                try {
            
                    await navigator.mediaDevices.getUserMedia({
                        video: true,
                        audio: true
                    });
                    const dev = await navigator.mediaDevices.enumerateDevices()

                    Microphones = dev.filter(device => device.kind === 'audioinput')
                    VideoDevices = dev.filter(device => device.kind === 'videoinput')
                    SpeakerDevices = dev.filter(device => device.kind === 'audiooutput')


                    return dev
                } catch (err) {
                    console.log(err)
                }
            }
        } catch (e) {
            console.log(e)
        }
        
    })


    const handleSubmit = () => {
        if(microSelected && videoSelected){
            devicesSelected.update((devices)=>{
                return {
                    microphoneId: microSelected,
                    videoId: videoSelected,
                    speakerId: speakerSelected
                }
            })
        }
    }

</script>

<div class="settings-card">
    <div class="card">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="card-inner">
            <div class="set">
                <label for="Microphones">Microphone:</label>
                <select bind:value={microSelected} name="Microphones" id="Microphones">
                    {#each Microphones as device}
                        <option value={device.deviceId}>{device.label}</option>
                    {/each}
                </select>
                <div class="select_arrow"></div>
            </div>
            <div class="set">
                <label for="Webcams">Webcam:</label>
                <select bind:value={videoSelected} name="Webcams" id="Webcams">
                    {#each VideoDevices as device}
                        <option value={device.deviceId}>{device.label}</option>
                    {/each}
                </select>
                <div class="select_arrow"></div>
            </div>
            <div class="set">
                <label for="Speakers">Speakers</label>
                <select bind:value={speakerSelected} name="Speakers" id="Speakers">
                    {#each SpeakerDevices as device}
                        <option value={device.deviceId}>{device.label}</option>
                    {/each}
                </select>
                <div class="select_arrow"></div>
            </div>
            <div class="buttons">
                <button on:click={handleSubmit}>Join</button>
            </div>
        </div>
    </div>
</div>

<style>
    .settings-card{
        height: fit-content;
        position: fixed;
        top: 50%;
        left: 46%;
        /* bring your own prefixes */
        transform: translate(-50%, -50%);
    }

    .card {
    width: 250px;
    height: auto;
    transition: all 0.2s;
    position: relative;
    cursor: pointer;
    }

    .card-inner {
    padding:1rem;
    width: inherit;
    height: inherit;
    background: rgba(255,255,255,.05);
    box-shadow: 0 0 10px rgba(0,0,0,0.25);
    backdrop-filter: blur(10px);
    border-radius: 8px;
    }

    .set{
    position: relative;
    color: white;
    display: flex;
    flex-direction:column;
    justify-content: center;
    margin-bottom: 1rem;
    }
    .buttons{
    display:flex;
    justify-content:center;
    gap: 1rem;
    }

    button{
    border-radius: 10px;
    border-style: none;
    padding: 0.5rem 1rem;
    background: white;
    cursor: pointer;
    }

    button:first-child{
    background: #EBD18D;
    }


    .set select{
    font-family: 'Arial';
    display: inline-block;
    width: 100%;
    cursor: pointer;
    padding: 7px 17px;
    outline: 0;
    border: 0px solid #000000;
    border-radius: 20px;
    background: whitesmoke;
    color: #000;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    }

    .circle {
    width: 100px;
    height: 100px;
    background: radial-gradient(#d9b864, #EBD18D);
    border-radius: 50%;
    position: absolute;
    animation: move-up6 2s ease-in infinite alternate-reverse;
    }

    .circle:nth-child(1) {
    top: -25px;
    left: -25px;
    }

    .circle:nth-child(2) {
    bottom: -25px;
    right: -58px;
    animation-name: move-down1;
    }

    @keyframes move-up6 {
    to {
        transform: translateY(-10px);
    }
    }

    @keyframes move-down1 {
    to {
        transform: translateY(10px);
    }
    }

    .select_arrow {
        position: absolute;
        top: 29px;
        right: 5px;
        pointer-events: none;
        border-style: solid;
        border-width: 8px 5px 0px 5px;
        border-color: #333333b8 transparent transparent transparent;
    }
</style>