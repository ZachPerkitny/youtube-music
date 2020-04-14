import slugify from 'slugify';
import util from 'util';
import RNFS from 'react-native-fs';
import { LogLevel, RNFFmpeg } from 'react-native-ffmpeg';
import ytdl from 'react-native-ytdl';
import { addToast } from '_actions/toasts';
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
        song,
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

function getSongsSuccess(songs, ids) {
    return {
        type: constants.GET_SONGS_SUCCESS,
        ids,
        songs,
    }
}

function getSongsFailure() {
    return {
        type: constants.GET_SONGS_FAILURE,
    }
}

function deleteSongStart() {
    return {
        type: constants.DELETE_SONG_START,
    }
}

function deleteSongSuccess(id) {
    return {
        type: constants.DELETE_SONG_SUCCESS,
        id,
    }
}

function deleteSongFailure() {
    return {
        type: constants.DELETE_SONG_FAILURE,
    }
}

export function addSong(url) {
    return async function(dispatch, getState) {
        dispatch(addSongStart());
        try {
            const info = await getInfo(url);
            const format = ytdl.chooseFormat(info.formats, {quality: 'highest'});
            const path = `${downloadDir}${info.title}.mp3`;
            await RNFFmpeg.executeWithArguments([
                '-i',
                format.url,
                '-vn',
                path]);
            dispatch(addSongSuccess({
                id: slugify(info.title),
                name: info.title,
                path
            }));
            dispatch(addToast(`Successfully downloaded ${info.title}`));
        } catch (err) {
            dispatch(addSongFailure());
            dispatch(addToast(`Error downloading ${info.title}`));
        }
    }
}

export function getSongs() {
    return async function(dispatch) {
        dispatch(getSongsStart());
        try {
            await RNFS.mkdir(downloadDir);
            const files = await RNFS.readDir(downloadDir);
            const songs = {};
            const ids = [];
            let i = 0;
            for (const file of files) {
                const name = file.path.split('/').pop().split('.').shift();
                const id = slugify(name);
                songs[id] = {
                    id,
                    name,
                    path: file.path,
                }
                ids.push(id);
            }
            dispatch(getSongsSuccess(songs, ids));
        } catch (err) {
            dispatch(getSongsFailure());
            dispatch(addToast('Error fetching songs'));
        }
    }
}

export function deleteSong(song) {
    return async function(dispatch) {
        dispatch(deleteSongStart());
        try {
            await RNFS.unlink(song.path);
            dispatch(deleteSongSuccess(song.id));
            dispatch(addToast(`Successfully deleted ${song.name}`));
        } catch (err) {
            dispatch(deleteSongFailure());
            dispatch(addToast(`Error deleting ${song.name}`));
        }
    }
}
