import React from "react";
import { IState as IProps } from './index';

const List: React.FC<IProps> = ({ msg }) => {

	const renderList = (): JSX.Element[] => {
		return msg.map((message) => {
			return (
				<li className="List">
					<div className="List-header">
						<p>{message.date} {message.author}: {message.content}</p>
					</div>
				</li>
			)
		})
	}
	return (
		<ul>
			{renderList()}
		</ul>
	)
}

export default List;
