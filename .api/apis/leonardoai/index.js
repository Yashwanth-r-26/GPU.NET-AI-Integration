import Oas from 'oas';
import APICore from 'api/dist/core';
import definition from './openapi.json';
class SDK {
    constructor() {
        this.spec = Oas.init(definition);
        this.core = new APICore(this.spec, 'leonardoai/v1.0.0 (api/6.1.3)');
    }
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    config(config) {
        this.core.setConfig(config);
    }
    /**
     * If the API you're using requires authentication you can supply the required credentials
     * through this method and the library will magically determine how they should be used
     * within your API request.
     *
     * With the exception of OpenID and MutualTLS, it supports all forms of authentication
     * supported by the OpenAPI specification.
     *
     * @example <caption>HTTP Basic auth</caption>
     * sdk.auth('username', 'password');
     *
     * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
     * sdk.auth('myBearerToken');
     *
     * @example <caption>API Keys</caption>
     * sdk.auth('myApiKey');
     *
     * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
     * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
     * @param values Your auth credentials for the API; can specify up to two strings or numbers.
     */
    auth(...values) {
        this.core.setAuth(...values);
        return this;
    }
    /**
     * If the API you're using offers alternate server URLs, and server variables, you can tell
     * the SDK which one to use with this method. To use it you can supply either one of the
     * server URLs that are contained within the OpenAPI definition (along with any server
     * variables), or you can pass it a fully qualified URL to use (that may or may not exist
     * within the OpenAPI definition).
     *
     * @example <caption>Server URL with server variables</caption>
     * sdk.server('https://{region}.api.example.com/{basePath}', {
     *   name: 'eu',
     *   basePath: 'v14',
     * });
     *
     * @example <caption>Fully qualified server URL</caption>
     * sdk.server('https://eu.api.example.com/v14');
     *
     * @param url Server URL
     * @param variables An object of variables to replace into the server URL.
     */
    server(url, variables = {}) {
        this.core.setServer(url, variables);
    }
    /**
     * This endpoint will return your user information such as your user id, username, token
     * renewal date and current amounts of the following: subscription tokens, gpt (prompt
     * generation) tokens, and model training tokens
     *
     * @summary Get user information
     */
    getUserSelf() {
        return this.core.fetch('/me', 'get');
    }
    /**
     * This endpoint will generate images
     *
     * @summary Create a Generation of Images
     */
    createGeneration(body) {
        return this.core.fetch('/generations', 'post', body);
    }
    /**
     * This endpoint will provide information about a specific generation
     *
     * @summary Get a Single Generation
     */
    getGenerationById(metadata) {
        return this.core.fetch('/generations/{id}', 'get', metadata);
    }
    /**
     * This endpoint deletes a specific generation
     *
     * @summary Delete a Single Generation
     */
    deleteGenerationById(metadata) {
        return this.core.fetch('/generations/{id}', 'delete', metadata);
    }
    /**
     * This endpoint returns all generations by a specific user
     *
     * @summary Get generations by user ID
     */
    getGenerationsByUserId(metadata) {
        return this.core.fetch('/generations/user/{userId}', 'get', metadata);
    }
    /**
     * This endpoint will generate a texture generation.
     *
     * @summary Create Texture Generation
     */
    createTextureGeneration(body) {
        return this.core.fetch('/generations-texture', 'post', body);
    }
    /**
     * This endpoint will generate a SVD motion generation.
     *
     * @summary Create SVD Motion Generation
     */
    createSVDMotionGeneration(body) {
        return this.core.fetch('/generations-motion-svd', 'post', body);
    }
    /**
     * This endpoint will generate a video using an uploaded or generated image.
     *
     * @summary Create a video generation from an image
     */
    createImageToVideoGeneration(body) {
        return this.core.fetch('/generations-image-to-video', 'post', body);
    }
    /**
     * This endpoint will generate a video using a text prompt
     *
     * @summary Create a video generation from a text prompt
     */
    createTextToVideoGeneration(body) {
        return this.core.fetch('/generations-text-to-video', 'post', body);
    }
    /**
     * This endpoint will upscale a generated video to a higher resolution.
     *
     * @summary Upscale a generated video
     */
    createVideoUpscale(body) {
        return this.core.fetch('/generations-video-upscale', 'post', body);
    }
    /**
     * This endpoint will generate a LCM image generation.
     *
     * @summary Create LCM Generation
     */
    createLCMGeneration(body) {
        return this.core.fetch('/generations-lcm', 'post', body);
    }
    /**
     * This endpoint will perform instant refine on a LCM image
     *
     * @summary Perform instant refine on a LCM image
     */
    performInstantRefine(body) {
        return this.core.fetch('/lcm-instant-refine', 'post', body);
    }
    /**
     * This endpoint will perform a inpainting on a LCM image
     *
     * @summary Perform inpainting on a LCM image
     */
    performInpaintingLCM(body) {
        return this.core.fetch('/lcm-inpainting', 'post', body);
    }
    /**
     * This endpoint will perform Alchemy Upscale on a LCM image
     *
     * @summary Perform Alchemy Upscale on a LCM image
     */
    performAlchemyUpscaleLCM(body) {
        return this.core.fetch('/lcm-upscale', 'post', body);
    }
    getTextureGenerationsByModelId(body, metadata) {
        return this.core.fetch('/generations-texture/model/{modelId}', 'get', body, metadata);
    }
    getTextureGenerationById(body, metadata) {
        return this.core.fetch('/generations-texture/{id}', 'get', body, metadata);
    }
    deleteTextureGenerationById(body, metadata) {
        return this.core.fetch('/generations-texture/{id}', 'delete', body, metadata);
    }
    /**
     * This endpoint returns presigned details to upload a 3D model to S3
     *
     * @summary Upload 3D Model
     */
    uploadModelAsset(body) {
        return this.core.fetch('/models-3d/upload', 'post', body);
    }
    get3DModelsByUserId(body, metadata) {
        return this.core.fetch('/models-3d/user/{userId}', 'get', body, metadata);
    }
    get3DModelById(body, metadata) {
        return this.core.fetch('/models-3d/{id}', 'get', body, metadata);
    }
    delete3DModelById(body, metadata) {
        return this.core.fetch('/models-3d/{id}', 'delete', body, metadata);
    }
    /**
     * This endpoint returns presigned details to upload an init image to S3
     *
     * @summary Upload init image
     */
    uploadInitImage(body) {
        return this.core.fetch('/init-image', 'post', body);
    }
    /**
     * This endpoint will return a single init image
     *
     * @summary Get single init image
     */
    getInitImageById(metadata) {
        return this.core.fetch('/init-image/{id}', 'get', metadata);
    }
    /**
     * This endpoint deletes an init image
     *
     * @summary Delete init image
     */
    deleteInitImageById(metadata) {
        return this.core.fetch('/init-image/{id}', 'delete', metadata);
    }
    /**
     * This endpoint returns presigned details to upload an init image and a mask image to S3
     *
     * @summary Upload Canvas Editor init and mask image
     */
    uploadCanvasInitImage(body) {
        return this.core.fetch('/canvas-init-image', 'post', body);
    }
    /**
     * This endpoint will create an unzoom variation for the provided image ID
     *
     * @summary Create unzoom
     */
    createVariationUnzoom(body) {
        return this.core.fetch('/variations/unzoom', 'post', body);
    }
    /**
     * This endpoint will create an upscale for the provided image ID
     *
     * @summary Create upscale
     */
    createVariationUpscale(body) {
        return this.core.fetch('/variations/upscale', 'post', body);
    }
    /**
     * This endpoint will create a no background variation of the provided image ID
     *
     * @summary Create no background
     */
    createVariationNoBG(body) {
        return this.core.fetch('/variations/nobg', 'post', body);
    }
    /**
     * This endpoint will create a high resolution image using Universal Upscaler
     *
     * @summary Create using Universal Upscaler
     */
    createUniversalUpscalerJob(body) {
        return this.core.fetch('/variations/universal-upscaler', 'post', body);
    }
    /**
     * This endpoint will get the variation by ID
     *
     * @summary Get variation by ID
     */
    getVariationById(metadata) {
        return this.core.fetch('/variations/{id}', 'get', metadata);
    }
    /**
     * This endpoint will get the motion variation by ID
     *
     * @summary Get motion variation by ID
     */
    getMotionVariationById(metadata) {
        return this.core.fetch('/motion-variations/{id}', 'get', metadata);
    }
    /**
     * This endpoint creates a new dataset
     *
     * @summary Create a Dataset
     */
    createDataset(body) {
        return this.core.fetch('/datasets', 'post', body);
    }
    /**
     * This endpoint gets the specific dataset
     *
     * @summary Get a Single Dataset by ID
     */
    getDatasetById(metadata) {
        return this.core.fetch('/datasets/{id}', 'get', metadata);
    }
    /**
     * This endpoint deletes the specific dataset
     *
     * @summary Delete a Single Dataset by ID
     */
    deleteDatasetById(metadata) {
        return this.core.fetch('/datasets/{id}', 'delete', metadata);
    }
    /**
     * This endpoint returns presigned details to upload a dataset image to S3
     *
     * @summary Upload dataset image
     */
    uploadDatasetImage(body, metadata) {
        return this.core.fetch('/datasets/{datasetId}/upload', 'post', body, metadata);
    }
    /**
     * This endpoint will upload a previously generated image to the dataset
     *
     * @summary Upload a Single Generated Image to a Dataset
     */
    uploadDatasetImageFromGen(body, metadata) {
        return this.core.fetch('/datasets/{datasetId}/upload/gen', 'post', body, metadata);
    }
    /**
     * This endpoint will train a new custom model
     *
     * @summary Train a Custom Model
     */
    createModel(body) {
        return this.core.fetch('/models', 'post', body);
    }
    /**
     * This endpoint gets the specific custom model
     *
     * @summary Get a Single Custom Model by ID
     */
    getModelById(metadata) {
        return this.core.fetch('/models/{id}', 'get', metadata);
    }
    /**
     * This endpoint will delete a specific custom model
     *
     * @summary Delete a Single Custom Model by ID
     */
    deleteModelById(metadata) {
        return this.core.fetch('/models/{id}', 'delete', metadata);
    }
    /**
     * This endpoint gets the list of custom models belongs to the user.
     *
     * @summary Get a list of Custom Models by User ID
     */
    getCustomModelsByUserId(metadata) {
        return this.core.fetch('/models/user/{userId}', 'get', metadata);
    }
    /**
     * Get a list of public Platform Models available for use with generations.
     *
     * @summary List Platform Models
     */
    listPlatformModels() {
        return this.core.fetch('/platformModels', 'get');
    }
    /**
     * This endpoint gets the specific custom element.
     *
     * @summary Get a Single Custom Element by ID
     */
    getElementById(metadata) {
        return this.core.fetch('/elements/{id}', 'get', metadata);
    }
    /**
     * This endpoint will delete a specific custom model.
     *
     * @summary Delete a Single Custom Element by ID
     */
    deleteElementById(metadata) {
        return this.core.fetch('/elements/{id}', 'delete', metadata);
    }
    /**
     * This endpoint gets the list of custom elements belongs to the user.
     *
     * @summary Get a list of Custom Elements by User ID
     */
    getCustomElementsByUserId(metadata) {
        return this.core.fetch('/elements/user/{userId}', 'get', metadata);
    }
    /**
     * This endpoint will train a new custom element.
     *
     * @summary Train a Custom Element
     */
    createElement(body) {
        return this.core.fetch('/elements', 'post', body);
    }
    /**
     * Get a list of public Elements available for use with generations.
     *
     * @summary List Elements
     */
    listElements() {
        return this.core.fetch('/elements', 'get');
    }
    /**
     * This endpoint returns a random prompt
     *
     * @summary Generate a Random prompt
     */
    promptRandom() {
        return this.core.fetch('/prompt/random', 'post');
    }
    /**
     * This endpoint returns a improved prompt
     *
     * @summary Improve a Prompt
     */
    promptImprove(body) {
        return this.core.fetch('/prompt/improve', 'post', body);
    }
    /**
     * This endpoint returns the cost used for generating images using a particular service
     * type.
     *
     * @summary Calculating API Cost
     */
    pricingCalculator(body) {
        return this.core.fetch('/pricing-calculator', 'post', body);
    }
}
const createSDK = (() => { return new SDK(); })();
export default createSDK;
