import * as React from 'react';
import { IUsersListProps } from './UsersList.types';
import { IUserData } from "../../interfaces";
import { capitalizeFirstLetter } from '../../utils';
import "./UsersList.css";


export const UsersList: React.FC<IUsersListProps> =(props: IUsersListProps) => {
  const { items } = props;

  const baseProfileCardClass ="minimalProfileCard";

  if (Array.isArray(items) && items.length> 0) {
    return (
      <ul className="usersList">
        { items
          .map((user: IUserData, idx: number) => (
          <li className={`usersList__item ${baseProfileCardClass}`} key={`-${idx}`}>
            <div className={`${baseProfileCardClass}__avatar ${baseProfileCardClass}__avatar--text`}>{user.name?.charAt(0)}</div>
            <div className={`${baseProfileCardClass}__content`}>
              <div className={`${baseProfileCardClass}__name`}>{user.name}</div>
              <div className={`${baseProfileCardClass}__type`}>{capitalizeFirstLetter((user.role as string) || '') }</div>
            </div>
          </li>
        ))}
      </ul>
    )
  } else {
    console.warn(`property 'items' being passed is not an array or is an empty array`)
    return null
  }
}
