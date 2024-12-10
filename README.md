# TDXReporter

This project aims to simplify the process of running reports to check employee productivity on TeamDynamix.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)

---

## Overview

In TeamDynamix, running a report requires manual input for each filter which slows the process down. This aims to minimize the time it takes to run the report by leveraging the sites static JS and the UUID's of the employees to both fill the filters, run, and display the data back to you in a more efficient manner.

## Installation

Recommended:
1. Download the most recent .crx file found in Releases (Note: Needs to be downloaded on a non-chromium browser).
3. Navigate to chrome://extensions/ and enable Developer Mode.
4. Drag and Drog .crx file in and install when prompted.

Alternate:
1. Download the source files of the extension.
3. Navigate to chrome://extensions/ and enable Developer Mode.
4. Load the extension using the "Load unpacked" option and select the downloaded folder.

## Usage

1. Pin Extension to Navigation Bar (optionally but recommended)
2. Click on Extension Icon when its use is neccessary.

## Technologies

- **Programming Languages**: JS, HTML, CSS
- **API Used**: Chrome Extension API, Chrome Side-Panel API
