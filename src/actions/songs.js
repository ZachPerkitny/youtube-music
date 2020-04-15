import slugify from 'slugify';
import util from 'util';
import RNFS from 'react-native-fs';
import { LogLevel, RNFFmpeg } from 'react-native-ffmpeg';
import ytdl from 'react-native-ytdl';
import { addToast } from '_actions/toasts';
import * as downloadDirs from '_constants/downloadDirs';
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
            const id = ytdl.getVideoID(url);
            const info = await getInfo(id);
            const format = ytdl.chooseFormat(info.formats, {quality: 'highest'});
            const path = `${downloadDirs.songs}/${info.title}.mp3`;
            const thumbnailPath = `${downloadDirs.thumbnails}/${info.title}.jpg`;
            await Promise.all([
                RNFS.mkdir(downloadDirs.songs),
                RNFS.mkdir(downloadDirs.thumbnails),
            ]);
            await Promise.all([
                RNFFmpeg.executeWithArguments([
                    '-i',
                    format.url,
                    '-vn',
                    path
                ]),
                RNFS.downloadFile({
                    fromUrl: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
                    toFile: thumbnailPath,
                }).promise,
            ]);
            dispatch(addSongSuccess({
                id: slugify(info.title),
                name: info.title,
                path,
                thumbnailPath,
            }));
            dispatch(addToast(`Successfully downloaded ${info.title}`));
        } catch (err) {
            console.log(err);
            dispatch(addSongFailure());
            dispatch(addToast(`Error downloading from ${url}`));
        }
    }
}

export function deleteSong(song) {
    return async function(dispatch) {
        dispatch(deleteSongStart());
        try {
            await Promise.all([
                RNFS.unlink(song.path),
                RNFS.unlink(song.thumbnailPath),
            ]);
            dispatch(deleteSongSuccess(song.id));
            dispatch(addToast(`Successfully deleted ${song.name}`));
        } catch (err) {
            dispatch(deleteSongFailure());
            dispatch(addToast(`Error deleting ${song.name}`));
        }
    }
}
