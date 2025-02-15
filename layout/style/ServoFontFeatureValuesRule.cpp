/* -*- Mode: C++; tab-width: 8; indent-tabs-mode: nil; c-basic-offset: 2 -*- */
/* vim: set ts=8 sts=2 et sw=2 tw=80: */
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* representation of CSSFontFeatureValuesRule for stylo */

#include "mozilla/ServoFontFeatureValuesRule.h"

#include "mozilla/ServoBindings.h"

using namespace mozilla::dom;

namespace mozilla {

ServoFontFeatureValuesRule::ServoFontFeatureValuesRule(
  RefPtr<RawServoFontFeatureValuesRule> aRawRule,
  uint32_t aLine, uint32_t aColumn)
  : CSSFontFeatureValuesRule(aLine, aColumn)
  , mRawRule(std::move(aRawRule))
{
}

ServoFontFeatureValuesRule::~ServoFontFeatureValuesRule()
{
}

size_t
ServoFontFeatureValuesRule::SizeOfIncludingThis(MallocSizeOf aMallocSizeOf) const
{
  // TODO Implement this!
  return aMallocSizeOf(this);
}

#ifdef DEBUG
void
ServoFontFeatureValuesRule::List(FILE* out, int32_t aIndent) const
{
  nsAutoCString str;
  for (int32_t i = 0; i < aIndent; i++) {
    str.AppendLiteral("  ");
  }
  Servo_FontFeatureValuesRule_Debug(mRawRule, &str);
  fprintf_stderr(out, "%s\n", str.get());
}
#endif

/* CSSRule implementation */

void
ServoFontFeatureValuesRule::GetCssText(nsAString& aCssText) const
{
  Servo_FontFeatureValuesRule_GetCssText(mRawRule, &aCssText);
}

/* CSSFontFeatureValuesRule implementation */

void
ServoFontFeatureValuesRule::GetFontFamily(nsAString& aFamilyListStr)
{
  Servo_FontFeatureValuesRule_GetFontFamily(mRawRule, &aFamilyListStr);
}

void
ServoFontFeatureValuesRule::GetValueText(nsAString& aValueText)
{
  Servo_FontFeatureValuesRule_GetValueText(mRawRule, &aValueText);
}

void
ServoFontFeatureValuesRule::SetFontFamily(const nsAString& aFontFamily,
                                          ErrorResult& aRv)
{
  aRv.Throw(NS_ERROR_NOT_IMPLEMENTED);
}

void
ServoFontFeatureValuesRule::SetValueText(const nsAString& aValueText,
                                         ErrorResult& aRv)
{
  aRv.Throw(NS_ERROR_NOT_IMPLEMENTED);
}

} // namespace mozilla
