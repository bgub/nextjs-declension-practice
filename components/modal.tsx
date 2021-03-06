import 'react-responsive-modal/styles.css';

import { useState } from 'react';
import {
  Button,
  DeclensionToggle,
  Checkbox,
  closeIcon,
} from '../components/modal-button';
import { Modal } from 'react-responsive-modal';

import {
  nounPatternOptions,
  genderOptions,
  numberOptions,
  phraseOptionsCzech,
  phraseOptionsSlovak,
  prepositionOptions,
} from '../src/default-config';

import { settingIsOn } from '../src/sentence-tools';

import { SelectComponent } from './select';

export function SettingsModal({
  declensions,
  settings,
  updateDeclensions,
  updateSettings,
  slovak,
}) {
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  function toggleDec(dec) {
    updateDeclensions((oldDeclensions) => {
      return { ...oldDeclensions, [dec]: !oldDeclensions[dec] };
    });
  }

  function toggleCheckbox(key) {
    updateSettings((oldSettings) => {
      return { ...oldSettings, [key]: !oldSettings[key] };
    });
  }

  function changeDropdown(key, newValue) {
    updateSettings((oldSettings) => {
      return { ...oldSettings, [key]: newValue };
    });
  }

  function DToggle({ name }) {
    return (
      <DeclensionToggle
        name={name}
        value={declensions[name]}
        onToggle={() => {
          toggleDec(name);
        }}
      />
    );
  }

  return (
    <>
      <Button onClick={onOpenModal} />
      {open && (
        <Modal open={open} onClose={onCloseModal} closeIcon={closeIcon} center>
          <div>
            <h2 className="text-xl font-bold py-2">Declensions</h2>

            <DToggle name="1" />
            <DToggle name="2" />
            <DToggle name="3" />
            <DToggle name="4" />
            <DToggle name="4-M" />
            {!slovak && <DToggle name="5" />}
            <DToggle name="6" />
            <DToggle name="7" />
          </div>
          <hr />
          <div>
            <h2 className="text-xl font-bold py-2">Options</h2>

            <SelectComponent
              options={nounPatternOptions}
              name="Nouns"
              value={settings.nounPatterns}
              onChange={(newValue) => {
                changeDropdown('nounPatterns', newValue);
              }}
            />

            <SelectComponent
              options={genderOptions}
              name="Gender"
              value={settings.gender}
              onChange={(newValue) => {
                changeDropdown('gender', newValue);
              }}
            />

            <SelectComponent
              options={slovak ? phraseOptionsSlovak : phraseOptionsCzech}
              name="Phrases"
              value={settings.phraseOptions}
              onChange={(newValue) => {
                changeDropdown('phraseOptions', newValue);
              }}
            />

            <SelectComponent
              options={numberOptions}
              name="Number"
              value={settings.numberOptions}
              onChange={(newValue) => {
                changeDropdown('numberOptions', newValue);
              }}
            />

            <SelectComponent
              options={prepositionOptions}
              name="Prepositions"
              value={settings.prepositions}
              onChange={(newValue) => {
                changeDropdown('prepositions', newValue);
              }}
            />
          </div>
          <hr />
          <div>
            <h2 className="text-xl font-bold py-2">Options</h2>
            <Checkbox
              value={settings.randomize}
              name="Randomize Phrases"
              onToggle={() => {
                toggleCheckbox('randomize');
              }}
            />
            {settingIsOn(settings, 'phraseOptions', 'basic') && (
              <>
                <Checkbox
                  value={settings.includeTo}
                  name="Include 'To'"
                  onToggle={() => {
                    toggleCheckbox('includeTo');
                  }}
                />
                <Checkbox
                  value={settings.includeAdjectives}
                  name="Include Adjectives"
                  onToggle={() => {
                    toggleCheckbox('includeAdjectives');
                  }}
                />
              </>
            )}
          </div>
          <br />
        </Modal>
      )}
    </>
  );
}
