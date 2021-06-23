import {makeStyles} from '@material-ui/core/styles';

export default makeStyles(() => ({
    root: {
        maxWidth: '100%',
    },
    media: {
        margin: '20px 10px',
        height: '20px',
        borderRadius: '10px',
        paddingTop: '200px',
    },
    cardActions: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    cardContent: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    name: {
        alignSelf: 'center',
        fontSize: '25px'
    },
}));