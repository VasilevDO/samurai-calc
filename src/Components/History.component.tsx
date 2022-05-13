import styled from 'styled-components';

interface HistoryP {
    history: string[]
}

const Container = styled.div`
    display: flex;
    flex-direction: column-reverse;
    flex-flow: column-reverse;

    width: 100%;
    height: 117px;

    font-size: 24px;
    line-height: 32px;
    font-weight: 500;

    overflow: hidden;

    > p {
        text-align: right;
    }
`;

const History = (props:HistoryP) => {
	const {history} = props;
	return (
		<Container>
			{[...history].reverse().map((u, i) => (
				<p key={`${i}:${u}`}>{u}</p>
			))}
		</Container>
	);
};

export default History;
