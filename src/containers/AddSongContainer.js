import { connect } from 'react-redux';
import { addSong } from '_actions/songs';
import AddSong from '_components/AddSong';

const mapStateToProps = (state) => {
    const { 
        songs: {
            isAdding,
        },
    } = state;

    return {
        isAdding,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addSong: (url) => dispatch(addSong(url)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddSong);
