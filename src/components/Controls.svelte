<script>
    export let showState
    export let endCall

    import VideoActiveIcon from '../assets/VideoActiveIcon.svelte'
    import VideoCloseIcon from '../assets/VideoCloseIcon.svelte'
    import MicroActiveIcon from '../assets/MicroActiveIcon.svelte'
    import MicroMuteIcon from '../assets/MicroMuteIcon.svelte'
    import VolumeActiveIcon from '../assets/VolumeActiveIcon.svelte'
    import VolumeMuteIcon from '../assets/VolumeMuteIcon.svelte'
    import SettingsIcon from '../assets/SettingsIcon.svelte'
    import PhoneCallIcon from '../assets/PhoneCallIcon.svelte'
	import SettingsCard from './SettingsCard.svelte';

    let Microphones = []
    let VideoDevices = []
    let SpeakerDevices = []

    import { showSettings as showSettingsStore } from '../stores'
	import { onDestroy } from 'svelte';
    let showSettings

    const unsubscribeSettings = showSettingsStore.subscribe(value => {
        showSettings = value
    })

    onDestroy(unsubscribeSettings)

    let stateString
    $: {
        if(showState) stateString='m-fadeIn'
        else stateString='m-fadeOut'
    }

    const handleSettings = async() => {
        const devices = await navigator.mediaDevices.enumerateDevices()
        Microphones = devices.filter(device => device.kind === 'audioinput')
        VideoDevices = devices.filter(device => device.kind === 'videoinput')
        SpeakerDevices = devices.filter(device => device.kind === 'audiooutput')
        showSettingsStore.update((state)=>!state)
    }

</script>

<section class="controls {stateString}" >
    <button class="toggle-camera">
        <VideoActiveIcon />
    </button>
    <button class="toggle-mic">
        <MicroActiveIcon />
    </button>
    <button class="mute">
        <VolumeActiveIcon />
    </button>
    <button class="settings" on:click={handleSettings}>
        <SettingsIcon />
    </button>
    <button class="end-call" on:click={endCall}>
        <PhoneCallIcon />
    </button>

</section>

{#if showSettings}
    <div>
        <SettingsCard
            Microphones={Microphones}
            VideoDevices={VideoDevices}
            SpeakerDevices={SpeakerDevices}
        />
    </div>
{/if}


<style>
    button {
        background: #EBD18D;
        align-items: center;
        color: black;
        list-style: none;
        border: none;
        padding: 0.5rem 0.7rem;
        border-radius: 0.4rem;
    }
    button:hover{
        background: #f6e4b6;
        cursor: pointer;
        
    }

    .controls {
        display: flex;
        padding: 0.5rem 1rem;
        gap: 2rem;
        background: #333;
        align-items: center;
        justify-content: center;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, -50%);
        width: fit-content;
        border-radius: 40px;
    }

    .m-fadeOut {
        visibility: hidden;
        opacity: 0;
        transition: visibility 0s linear 300ms, opacity 300ms;
    }
    .m-fadeIn {
        visibility: visible;
        opacity: 1;
        transition: visibility 0s linear 0s, opacity 300ms;
    }

    .end-call{
        color: #cc4b41;
    }
    .end-call:hover{
        background: #cc4b41;
        color: #D1CCDC;
    }

</style>
