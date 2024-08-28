import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box } from '@mui/material';
import { useModal } from '../contexts/ModalContext';

const Modal: React.FC = () => {
  const { isOpen, modalContent, closeModal } = useModal();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            zIndex: 9999,
          }}
          onClick={closeModal}
        >
          <Box onClick={(e) => e.stopPropagation()}>
            {modalContent}
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;