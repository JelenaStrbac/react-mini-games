import ReactDOM from "react-dom";
import styled from "styled-components";

const ModalResults = ({ isShowingResultsModal, toggleTwo, children }) =>
  isShowingResultsModal
    ? ReactDOM.createPortal(
        <>
          <ModalOverlay className="modal-overlay" />
          <ModalWrapper
            className="modal-wrapper"
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
          >
            <ModalMain className="modal">
              <ModalHeader className="modal-header">
                <StyledButton
                  type="button"
                  className="modal-close-button"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={toggleTwo}
                >
                  <span aria-hidden="true">&times;</span>
                </StyledButton>
              </ModalHeader>
              <ModalBody>{children}</ModalBody>
            </ModalMain>
          </ModalWrapper>
        </>,
        document.body
      )
    : null;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1040;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  opacity: 0.5;
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1050;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  outline: 0;
`;

const ModalMain = styled.div`
  z-index: 100;
  background: white;
  position: relative;
  margin: 30px auto;
  border-radius: 3px;
  max-width: 500px;
  padding: 2rem;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ModalBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: space-between;
  color: black;
`;

const StyledButton = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 1;
  color: #000;
  opacity: 0.3;
  cursor: pointer;
  border: none;
`;

export default ModalResults;
