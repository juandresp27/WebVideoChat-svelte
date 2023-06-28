<script>
    export let showState
    import Microphone from '../assets/Microphone.svelte'
    import MicrophoneFill from '../assets/MicrophoneFill.svelte'
    import Webcam from '../assets/Webcam.svelte'
    import WebcamFill from '../assets/WebcamFill.svelte'
    import CallIcon from '../assets/Call-Icon.svelte'

    let stateString
    $: {
        if(showState) stateString='m-fadeIn'
        else stateString='m-fadeOut'
    }
</script>

<div class="controls {stateString}" >
    <button class="toggle-camera">
        <WebcamFill />
    </button>
    <button class="toggle-mic">
        <Microphone />
    </button>
    <button class="mute">
        
    </button>
    <button class="settings">

    </button>
    <button class="end-call">
        <CallIcon />
    </button>
</div>

<style>
    button {
        background: rgba(130, 85, 169, 0.59);
        color: white;
        list-style: none;
        border: none;
        padding: 0.5rem 0.7rem;
        border-radius: 0.4rem;
    }
    button:hover{
        background: rgba(166, 87, 236, 0.59);
        cursor: pointer;
        
    }

    .controls {
        display: flex;
        padding: 0.5rem 1rem;
        gap: 2rem;
        background: #341d45;
        align-items: center;
        justify-content: center;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 50%;
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

</style>
