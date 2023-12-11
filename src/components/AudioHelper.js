export function createAudio(popSound, volume, playbackRate) {
    let audio = new Audio(popSound);
    audio.volume = volume;
    audio.playbackRate = playbackRate;
    return audio;
}