import React from 'react';
import { withStyles } from '@material-ui/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = {
  dialogPaper: {
    minHeight: 'auto',
    maxHeight: 'auto',
  },
};

function VideoDialog(props) {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={false}
        classes={{ paper: props.classes.dialogPaper }}
      >
        <DialogTitle id="alert-dialog-title">{props.video.key}</DialogTitle>
        <DialogContent>
          <video preload="auto" autoplay="autoplay" controls>
            <source src={`https://shootsta.s3-ap-southeast-1.amazonaws.com/videos/${props.video.key.replace(/ /g, "+")}`} type="video/mp4" />
          </video>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default withStyles(styles)(VideoDialog);