"use client";
import React, { Dispatch, createContext, useContext, useReducer } from "react";

type Data = {
  isAccount: boolean;
  isAdress: boolean;
  isEmail: boolean;
  isPoint: boolean;
  isNickName: boolean;
};

export enum ModalStatus {
  "Account",
  "Adress",
  "Email",
  "Point",
  "NickName",
  "reset",
}
type ModalAction = {
  type: ModalStatus;
  isOpen: boolean;
};

const reducerFunc = (state: Data, action: ModalAction): Data => {
  // Object -> Array
  const objectToArrayReset = Object.entries(state).map((v) => {
    if (typeof v[1] === "boolean") v[1] = false;
    return v;
  });

  // Array -> Object
  const ArrayToObjectReset = Object.fromEntries(objectToArrayReset);

  switch (action.type) {
    case ModalStatus.Account:
      return {
        ...state,
        ...ArrayToObjectReset,
        isAccount: action.isOpen,
      };
    case ModalStatus.Adress:
      return {
        ...state,
        ...ArrayToObjectReset,
        isAdress: action.isOpen,
      };
    case ModalStatus.Email:
      return {
        ...state,
        ...ArrayToObjectReset,
        isEmail: action.isOpen,
      };
    case ModalStatus.NickName:
      return {
        ...state,
        ...ArrayToObjectReset,
        isNickName: action.isOpen,
      };
    case ModalStatus.Point:
      return {
        ...state,
        ...ArrayToObjectReset,
        isPoint: action.isOpen,
      };
    case ModalStatus.reset:
      return {
        ...state,
        ...ArrayToObjectReset,
      };
    default:
      return {
        ...state,
      };
  }
};

const ModalContext = createContext<any>(null);

export default function ModalProovider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [data, dataDispatch] = useReducer(reducerFunc, {
    isAccount: false,
    isAdress: false,
    isEmail: false,
    isNickName: false,
    isPoint: false,
  } as Data);

  return (
    <ModalContext.Provider value={[data, dataDispatch]}>
      {children}
    </ModalContext.Provider>
  );
}

export const useModalController = () =>
  useContext<[Data, Dispatch<ModalAction>]>(ModalContext);
