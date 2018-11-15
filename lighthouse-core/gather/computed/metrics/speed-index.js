/**
 * @license Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */
'use strict';

const makeComputedArtifact = require('../new-computed-artifact.js');
const ComputedMetric = require('./metric');
const LanternSpeedIndex = require('./lantern-speed-index.js');
const Speedline = require('../speedline.js');

class SpeedIndex extends ComputedMetric {
  /**
   * @param {LH.Artifacts.MetricComputationData} data
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Artifacts.LanternMetric>}
   */
  static computeSimulatedMetric(data, context) {
    return LanternSpeedIndex.request(data, context);
  }

  /**
   * @param {LH.Artifacts.MetricComputationData} data
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Artifacts.Metric>}
   */
  static async computeObservedMetric(data, context) {
    const speedline = await Speedline.request(data.trace, context);
    const timing = Math.round(speedline.speedIndex);
    const timestamp = (timing + speedline.beginning) * 1000;
    return Promise.resolve({timing, timestamp});
  }
}

module.exports = makeComputedArtifact(SpeedIndex);