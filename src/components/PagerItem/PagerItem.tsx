import * as React from 'react';

import { ApiItemType } from '../../api/ApiItemType';

import './PagerItem.css';

export const PagerItem = (props: { data: ApiItemType }) => (
  <article className="pager-item">
    <div className="pager-item__id">
      <svg viewBox="0 0 400 25">
        <text x="0" y="20">
          {props.data._id}
        </text>
      </svg>
    </div>
    <h3 className="pager-item__title">{props.data.title}</h3>
    <div className="pager-item__date">
      {new Date(props.data.date).toUTCString()}
    </div>
    <div className="pager-item__description">{props.data.description}</div>
  </article>
);
