import styled from 'styled-components';

interface HistoryP {
    history: string[]
}

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column-reverse;
    flex-flow: column-reverse;

    height: 117px;

    font-size: 24px;
    line-height: 32px;
    font-weight: 500;

    overflow: hidden;

    > p {
        text-align: right;
        overflow-wrap: anywhere;
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
