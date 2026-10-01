import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { forwardRef, type ReactElement, type Ref } from 'react';
import { useTranslation } from 'react-i18next';
import Slide, { type SlideProps } from '@mui/material/Slide';
import { type TransitionProps } from '@mui/material/transitions';


interface InformationDialogProps {
    open: boolean;
    onClose: () => void;
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
    transitionAnimation = false,
}: InformationDialogProps) => {
    const { t } = useTranslation();
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
                {t('header.help&support.title')}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {t('header.help&support.content')}

                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={onClose}
                    variant="text"
                >
                    {t('common.close')}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default InformationDialog