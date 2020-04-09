import util from 'util';
import RNFS from 'react-native-fs';
import { LogLevel, RNFFmpeg } from 'react-native-ffmpeg';
import ytdl from 'react-native-ytdl';
import TrackPlayer from 'react-native-track-player';
import downloadDir from '_constants/downloadDir';
import * as constants from '_constants/songs';

const getInfo = util.promisify(ytdl.getInfo);

function addSongStart() {
    return {
        type: constants.ADD_SONG_START,
    }
}

function addSongSuccess(song) {
    return {
        type: constants.ADD_SONG_SUCCESS,
        song
    }
}

function addSongFailure() {
    return {
        type: constants.ADD_SONG_FAILURE,
    }
}

function getSongsStart() {
    return {
        type: constants.GET_SONGS_START,
    }
}

function getSongsSuccess(songs) {
    return {
        type: constants.GET_SONGS_SUCCESS,
        songs
    }
}

function getSongsFailure() {
    return {
        type: constants.GET_SONGS_FAILURE,
    }
}

function playSongStart() {
    return {
        type: constants.PLAY_SONG_START,
    }
}

function playSongSuccess(song) {
    return {
        type: constants.PLAY_SONG_SUCCESS,
        song
    }
}

function playSongFailure() {
    return {
        type: constants.PLAY_SONG_FAILURE,
    }
}

export function addSong(url) {
    return async function(dispatch, getState) {
        dispatch(addSongStart());
        try {
            const info = await getInfo(url);
            const format = ytdl.chooseFormat(info.formats, {quality: 'highest'});
            const path = `${downloadDir}/${info.title}.mp3`;
            await RNFFmpeg.executeWithArguments([
                '-i',
                format.url,
                '-vn',
                path]);
            dispatch(addSongSuccess({
                id: getState().songs.songs.length,
                name: info.title,
                path
            }));
        } catch (err) {
            dispatch(addSongFailure());
        }
    }
}

export function getSongs() {
    return async function(dispatch) {
        dispatch(getSongsStart());
        try {
            await RNFS.mkdir(downloadDir);
            const files = await RNFS.readDir(downloadDir);
            const songs = [];
            let i = 0;
            for (const file of files) {
                songs.push({
                    id: i++, 
                    name: file.path.split('/').pop().split('.').shift(),
                    path: file.path,
                });
            }
            dispatch(getSongsSuccess(songs));
        } catch (err) {
            dispatch(getSongsFailure());
        }
    }
}

export function playSong(song) {
    return async function(dispatch) {
        dispatch(playSongStart());
        try {
            await TrackPlayer.reset();
            await TrackPlayer.add({
                id: song.id,
                url: song.path
            });
            await TrackPlayer.play();
            dispatch(playSongSuccess(song));
        } catch (err) {
            dispatch(playSongFailure());
        }
    }
}
