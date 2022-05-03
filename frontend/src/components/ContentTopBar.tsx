import {
  Button,
  Dialog,
  Heading,
  IconButton,
  majorScale,
  Pane,
  Pill,
  SegmentedControl,
  Spinner, Switch
} from "evergreen-ui";
import React, {FunctionComponent, useState} from "react";

type DupeMovieTopBarProps = {
  loading: boolean,
  deleting: boolean,
  includeIgnored: boolean,
  numContent: number,
  numSelected: number,
  totalSize: string,
  onDeleteMedia: () => void,
  onRefresh: () => void,
  listingType: string,
  listingOptions: any[],
  onListingTypeChange: (type: string) => void,
  onDeselectAll: () => void,
  onResetSelection: () => void,
  onInvertSelection: () => void,
  onChangeIncludeIgnored: (value: boolean) => void,
}

export const ContentTopBar:FunctionComponent<DupeMovieTopBarProps> = (props) => {
  const {
    loading,
    deleting,
    includeIgnored,
    numContent,
    numSelected,
    totalSize,
    onDeleteMedia,
    onRefresh,
    listingType,
    listingOptions,
    onListingTypeChange,
    onDeselectAll,
    onResetSelection,
    onInvertSelection
  } = props;

  const [showDeleteWarning, setShowDeleteWarning] = useState(false);

  const onClickConfirmDelete = () => {
    setShowDeleteWarning(false);
    onDeleteMedia();
  };

  return (
    <>
    <Pane background="tint2"
          borderRadius={3}
          padding={majorScale(2)}
    >
      <Pane display="flex">
        <Pane flex={1} alignItems="center" display="flex">
          <IconButton
            icon="refresh"
            onClick={onRefresh}
          />
          <SegmentedControl
            name="switch"
            marginX={majorScale(2)}
            width={160}
            height={32}
            options={listingOptions}
            value={listingType}
            onChange={value => onListingTypeChange(value.toString())}
          />
        </Pane>
        <Pane display="flex">
          { numContent > 0 && numSelected === 0 ? (
            <Button
              appearance="default"
              intent="none"
              disabled={numSelected !== 0}
              onClick={() => onResetSelection()}
            >Reset Selection</Button>
          ) : (
            <Button
              appearance="default"
              intent="none"
              disabled={numSelected === 0}
              onClick={() => onDeselectAll()}
            >Deselect All</Button>
          )}
        </Pane>
        <Pane display="flex">
          <Button
            appearance="default"
            intent="none"
            disabled={numSelected === 0}
            onClick={() => onInvertSelection()}
          >Invert Selection</Button>
        </Pane>
        <Pane display="flex">
          {deleting ?
            <Button
              appearance="primary"
              intent="danger"
              disabled={true}
            >
              <Spinner size={16} marginRight={8}/>
              Deleting Items
            </Button>
            :
            <Button
              appearance="primary"
              intent="danger"
              disabled={numSelected === 0}
              onClick={() => setShowDeleteWarning(true)}
            >Delete Selected Items</Button>
          }
        </Pane>
      </Pane>
      <Pane display={"flex"} paddingTop={majorScale(2)}>
        <Pane flex={1} display={"flex"}>
          <Heading marginRight={30}>
            Content Found:
            <Pill display="inline-flex" margin={8} color="green">{ loading ? '-' : numContent }</Pill>
          </Heading>
          <Heading marginRight={30}>
            Selected:
            <Pill display="inline-flex" margin={8} color="green">{ loading ? '-' : numSelected }</Pill>
          </Heading>
          <Heading marginRight={30}>
            Size:
            <Pill display="inline-flex" margin={8} color="orange">{ loading ? '-' : totalSize }</Pill>
          </Heading>
        </Pane>
        <Pane display={"flex"} alignItems={"center"}>
          <Switch
              height={20}
              checked={includeIgnored}
              onChange={e => props.onChangeIncludeIgnored(e.target.checked)}
              marginRight={10}
          />
          <Heading size={100}>Show Ignored</Heading>
        </Pane>
      </Pane>
    </Pane>
      <Dialog
        isShown={showDeleteWarning}
        title="Warning"
        intent="danger"
        confirmLabel="Delete Selected Items"
        onConfirm={onClickConfirmDelete}
        onCloseComplete={() => setShowDeleteWarning(false)}
      >
        Are you sure you want to delete {numSelected} items?
      </Dialog>
    </>
  )
};
