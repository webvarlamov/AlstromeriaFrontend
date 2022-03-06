import {SuggestionOwnerInputEvent} from "../../modules/input-components/components/input-component/input.component";

export interface SuggestionFilterableListViewStateManager {
  onSuggestionOwnerValueChangeEvent(args: SuggestionOwnerInputEvent): void;
}
