import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { forwardRef, type ReactElement, type Ref } from 'react';
import Slide, { type SlideProps } from '@mui/material/Slide';
import { type TransitionProps } from '@mui/material/transitions';


interface InformationDialogProps {
    open: boolean;
    onClose: () => void;
    title: string;
    contentText: string;
    buttonText: string
    transitionAnimation?: boolean;
}

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: ReactElement<any, any>;
    },
    ref: Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const InformationDialog = ({
    open,
    onClose,
    title,
    contentText,
    buttonText = "Close",
    transitionAnimation = false,
}: InformationDialogProps) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            slots={{
                transition: transitionAnimation ? Transition : undefined,
            }}
            keepMounted
        >
            <DialogTitle >
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {contentText}

                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={onClose}
                    variant="text"
                >
                    {buttonText}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default InformationDialog