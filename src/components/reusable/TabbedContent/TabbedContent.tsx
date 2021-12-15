import React from 'react';
import Tabs, { Tab } from './Tabs';
import TabbedContentWrapper, {
    TabContentWrapper, 
} from './tabbedContent.styles';


type Props = {
    tabs: Array<Tab>,
}

type State = {
    activeTab: number,
}

const TabbedContent: React.FC<Props> = ({ tabs }) => {
    const [state, setState] = React.useState<State>({
        activeTab: 0,
    });

    const handleOnChange = (tabIndex: number) => {
        if (tabs[tabIndex].content)
            setState({ activeTab: tabIndex })
    }

    return <TabbedContentWrapper>
        <Tabs tabs={tabs} activeTabIndex={state.activeTab} onChange={handleOnChange} />
        {state.activeTab !== null
            && tabs[state.activeTab]
            && <TabContentWrapper>
                {tabs[state.activeTab].content}
            </TabContentWrapper>}
    </TabbedContentWrapper>
}

export default TabbedContent;