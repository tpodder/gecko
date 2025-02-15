/* -*- Mode: C++; tab-width: 8; indent-tabs-mode: nil; c-basic-offset: 4 -*-
 * vim: set ts=8 sts=4 et sw=4 tw=99:
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

#include "js/Realm.h"

#include "vm/GlobalObject.h"
#include "vm/JSCompartment.h"
#include "vm/JSContext.h"

#include "vm/JSCompartment-inl.h"

using namespace js;

JS_PUBLIC_API(void)
gc::TraceRealm(JSTracer* trc, JS::Realm* realm, const char* name)
{
    // The way GC works with compartments is basically incomprehensible.
    // For Realms, what we want is very simple: each Realm has a strong
    // reference to its GlobalObject, and vice versa.
    //
    // Here we simply trace our side of that edge. During GC,
    // GCRuntime::traceRuntimeCommon() marks all other realm roots, for
    // all realms.
    realm->traceGlobal(trc);
}

JS_PUBLIC_API(bool)
gc::RealmNeedsSweep(JS::Realm* realm)
{
    return realm->globalIsAboutToBeFinalized();
}

JS_PUBLIC_API(JS::Realm*)
JS::GetCurrentRealmOrNull(JSContext* cx)
{
    return cx->realm();
}

JS_PUBLIC_API(JS::Realm*)
JS::GetObjectRealmOrNull(JSObject* obj)
{
    return IsCrossCompartmentWrapper(obj) ? nullptr : obj->realm();
}

JS_PUBLIC_API(void*)
JS::GetRealmPrivate(JS::Realm* realm)
{
    return realm->realmPrivate();
}

JS_PUBLIC_API(void)
JS::SetRealmPrivate(JS::Realm* realm, void* data)
{
    realm->setRealmPrivate(data);
}

JS_PUBLIC_API(void)
JS::SetDestroyRealmCallback(JSContext* cx, JS::DestroyRealmCallback callback)
{
    cx->runtime()->destroyRealmCallback = callback;
}

JS_PUBLIC_API(void)
JS::SetRealmNameCallback(JSContext* cx, JS::RealmNameCallback callback)
{
    cx->runtime()->realmNameCallback = callback;
}

JS_PUBLIC_API(JSObject*)
JS::GetRealmGlobalOrNull(Handle<JS::Realm*> realm)
{
    return realm->maybeGlobal();
}

JS_PUBLIC_API(JSObject*)
JS::GetRealmObjectPrototype(JSContext* cx)
{
    CHECK_REQUEST(cx);
    return GlobalObject::getOrCreateObjectPrototype(cx, cx->global());
}

JS_PUBLIC_API(JSObject*)
JS::GetRealmFunctionPrototype(JSContext* cx)
{
    CHECK_REQUEST(cx);
    return GlobalObject::getOrCreateFunctionPrototype(cx, cx->global());
}

JS_PUBLIC_API(JSObject*)
JS::GetRealmArrayPrototype(JSContext* cx)
{
    CHECK_REQUEST(cx);
    return GlobalObject::getOrCreateArrayPrototype(cx, cx->global());
}

JS_PUBLIC_API(JSObject*)
JS::GetRealmErrorPrototype(JSContext* cx)
{
    CHECK_REQUEST(cx);
    return GlobalObject::getOrCreateCustomErrorPrototype(cx, cx->global(), JSEXN_ERR);
}

JS_PUBLIC_API(JSObject*)
JS::GetRealmIteratorPrototype(JSContext* cx)
{
    CHECK_REQUEST(cx);
    return GlobalObject::getOrCreateIteratorPrototype(cx, cx->global());
}
