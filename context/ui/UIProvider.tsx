import { useReducer } from 'react';
import { UIContext, uiReducer } from './';

interface Props {
    children: JSX.Element;
}
export interface UIState {
    sideMenuOpen: boolean;
    isAddingEntry: boolean;
    isDragging: boolean;
}

const UI_INITAL_STATE: UIState = {
    sideMenuOpen: false,
    isAddingEntry: false,
    isDragging: false,
}

export const UIProvider = ({ children }: Props) => {

    const [state, dispatch] = useReducer(uiReducer, UI_INITAL_STATE);

    const openSideMenu = () => {
        dispatch({type: '[UI] - Open Sidebar'});
    }

    const closeSideMenu = () => {
        dispatch({type: '[UI] - Close Sidebar'});
    }

    const setIsAddingEntry = ( isAdding: boolean ) => {
        dispatch({type: '[UI] - Add Entry', payload: isAdding })
    }

    const startDragging = () => {
        dispatch({type: '[UI] - Start Dragging'});
    }

    const endDragging = () => {
        dispatch({type: '[UI] - End Dragging'});
    }

    return (
        <UIContext.Provider value={{
            ...state,

            // Methods
            openSideMenu,
            closeSideMenu,
            setIsAddingEntry,
            startDragging,
            endDragging
        }}>
            {children}
        </UIContext.Provider>
    )
}